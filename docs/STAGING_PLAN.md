# Staging Plan

> Minimal viable staging design for StartHere.

## Goal

Introduce one production-like environment between local and production so that risky changes do not go straight from developer machine to real users.

## Non-Goals

This first staging milestone does not aim to:

- build a perfect platform
- introduce Kubernetes or heavy orchestration
- solve every observability concern
- fully automate every rollback path on day one

The goal is a safe and simple intermediate environment.

## Why Staging Comes First

Current release shape is effectively:

`local -> main -> production`

That is too risky for:

- database changes
- auth and email flow changes
- environment or deployment changes
- frontend/backend integration work

## Current Reality

The repository already gives us useful building blocks:

- frontend and backend are containerized
- deployment already happens through GitHub Actions
- backend configuration is environment-variable driven
- local Docker Compose already models frontend, backend, and MySQL together

This means staging can start as a lightweight extension of the current production shape.

## Current Risks We Must Account For

### Backend Auto-Migration On Startup

The backend currently calls `database.AutoMigrate()` during application startup.

This is convenient for development, but risky for controlled staging and production operations because:

- app startup and schema change are coupled
- migration execution is less visible
- rollback planning becomes harder
- production behavior can differ from intended release sequencing

This does not block the first staging environment from existing, but it must be treated as a known risk and later removed from the production-grade path.

## Proposed Minimal Staging Architecture

Use the same single ECS host for now if resources allow, but isolate staging clearly.

### Frontend

- separate container name, such as `starthere-web-staging`
- separate host port, such as `8081`
- separate URL, preferably `staging.star-there.com`

### Backend

- separate container name, such as `starthere-server-staging`
- separate host port, such as `18080`
- separate env values
- backend health endpoint used for smoke checks

### Database

- separate staging database, not the production database
- acceptable options for first milestone:
  - separate schema or database instance on the same MySQL server
  - separate MySQL container if managed DB separation is not available yet

Preferred option:

- separate database on the managed MySQL service if possible

### Secrets

- separate GitHub environment configuration for staging
- keep only truly sensitive values in secrets
- keep normal environment config in variables
- email can start in safer mode if needed, such as log mode, depending on the validation goal

## Domain And Routing Recommendation

Recommended:

- production web: `star-there.com`
- staging web: `staging.star-there.com`
- production API: existing production path
- staging API: `staging-api.star-there.com` or same staging domain with `/api`

If domain work is too slow for the first milestone, temporary IP-plus-port access is acceptable, but should not be the long-term shape.

## Deployment Strategy

Recommended first delivery path:

1. push branch or merge target for staging deployment
2. CI validates code
3. build staging images or reuse commit-tagged images
4. deploy to staging containers on the existing server
5. run staging smoke checks
6. promote to production only after staging verification for risky changes

### Simple Branch Strategy For Staging

Short-term practical option:

- `main` continues to represent production-ready code
- staging deploy can be triggered manually from GitHub Actions using a chosen ref

Why this is a good first step:

- avoids introducing a long-lived `staging` branch too early
- keeps branch strategy simpler
- still allows pre-production validation

Alternative later:

- dedicated staging environment deploy on merge to `main`, followed by explicit promotion to production

## Acceptance Criteria For The First Staging Milestone

The first staging milestone is done when:

- staging frontend is reachable through a stable URL or host/port
- staging backend is reachable and health-checkable
- staging uses separate configuration from production
- staging does not write to production data
- one end-to-end core flow can be validated there
- deployment to staging can be triggered repeatably from CI or a documented script

## Suggested Validation Flow

At minimum, validate these in staging:

- homepage loads
- register or login path works
- authenticated API request works
- create or update one goal succeeds
- backend health endpoint remains healthy after deploy

## Implementation Sequence

### Step 1: Design And Configuration

- define staging domain or temporary access path
- define staging container names and ports
- define staging secrets and database target

### Step 2: Deployment Plumbing

- add staging deploy path in GitHub Actions
- create GitHub `staging` environment with staging-specific secrets and vars
- add staging-specific environment variables
- add staging smoke checks

### Step 3: Validation

- deploy one known-good version to staging
- verify core flows manually
- document gaps

### Step 4: Tighten The Release Path

- require risky changes to pass through staging before production
- decouple database migrations from app startup in a later milestone

## Open Questions

These need confirmation before implementation:

- Will staging share the same ECS host as production for the first iteration?
- Do you want a subdomain-based staging URL now, or a temporary host/port first?
- Should staging email send real mail, or use log mode initially?
- Is a separate managed MySQL database available, or do we need a temporary containerized staging DB?

## Recommended Defaults

Unless there is a strong constraint, I recommend:

- same ECS host for the first staging iteration
- separate subdomain if DNS changes are easy enough
- separate managed MySQL database if available
- staging email in log mode initially

These choices minimize user impact and reduce accidental leakage into production behavior.

## Implementation Status

Current repository status after the first implementation pass:

- deploy workflow now supports manual `staging` or `production` deployment selection
- frontend Docker build now accepts a build-time `VITE_API_BASE_URL`
- remote deploy now includes minimal smoke checks for web and backend health

Still required outside the repository:

- create GitHub Environments named `production` and `staging`
- populate environment secrets and variables for each environment
- provision the staging database and DNS target
