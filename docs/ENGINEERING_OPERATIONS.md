# Engineering Operations

> StartHere production engineering rules for source control, delivery, release safety, observability, and infrastructure build-out.

## Goals

This document exists to keep delivery fast without making production unsafe.

We optimize for:

- small and reversible changes
- repeatable deployment
- controlled database evolution
- test-backed release confidence
- enough observability to detect and diagnose failures

## Current State

Based on the repository today:

- `main` pushes and pull requests trigger CI validation
- production deployment is manual via workflow dispatch
- frontend lint, frontend tests, frontend build, backend vet, and backend tests run in CI before deploy
- staging environment exists, but promotion rules are not yet enforced
- database migrations now run explicitly before backend deploy, while staging and production app containers disable `AutoMigrate`
- backend health endpoint exists and is used for minimal deploy smoke checks
- logging, metrics, tracing, and alerting are not yet standardized

This means the project can deploy, but release safety is still incomplete.

## Branch Strategy

Default strategy: trunk-based development with short-lived branches.

### Branch Types

- `main`
  - production branch
  - always releasable
  - protected branch
  - direct pushes should be avoided

- `feature/<topic>`
  - normal feature work
  - short-lived
  - rebased or merged quickly

- `fix/<topic>`
  - normal bug fix work

- `hotfix/<topic>`
  - production incident or urgent bug fix
  - highest priority path

- `chore/<topic>`
  - tooling, docs, CI, infra, refactor work without user-facing behavior changes

### Branch Rules

- Keep branches small enough to review and validate in one cycle.
- Do not leave long-running feature branches drifting from `main`.
- If a feature takes more than a few days, split it into mergeable slices behind safe defaults or feature flags.
- Every branch must have a clear delivery goal and verification plan.

## Commit And Merge Rules

### Commit Style

Prefer conventional-style commit subjects:

- `feat: ...`
- `fix: ...`
- `refactor: ...`
- `test: ...`
- `docs: ...`
- `chore: ...`
- `ci: ...`

### Merge Requirements

Before merging into `main`, the change should have:

- clear scope and acceptance criteria
- updated tests or explicit test waiver
- passing required CI checks
- rollback understanding
- database impact called out when relevant

For now, if the repo is still effectively single-developer-operated, this can be lightweight. The rule still stands even if enforcement is manual.

## Change Categories

Different change types require different discipline.

### Frontend-Only Changes

Examples:

- layout and style changes
- page logic changes
- client-side validation
- API integration changes that do not alter backend contracts

Required before merge:

- affected unit or component tests updated when logic changes
- frontend lint and test pass
- production build pass
- manual verification for critical journeys

### Backend-Only Changes

Examples:

- handler, service, repository changes
- validation, auth, business logic, side effects

Required before merge:

- unit or integration tests for behavior changes
- `go test` pass
- `go vet` pass
- migration impact reviewed if data access changes
- API contract changes documented

### Database Changes

Database changes are high-risk and must be treated differently.

Examples:

- schema changes
- index changes
- data backfills
- column rename/drop
- constraint changes

Required before merge:

- forward migration script
- rollback or mitigation plan
- application compatibility review
- data safety review
- deployment sequencing defined

Database changes should prefer:

- additive migrations first
- backfill separately if needed
- code that can tolerate old and new schema during rollout
- destructive cleanup only after the new path is proven in production

Avoid direct destructive migrations in the same release as behavior changes when possible.

## Release And Deployment Rules

### Release Philosophy

- production deploys should be boring
- each deploy should be small, attributable, and recoverable
- deploy pipelines must validate before rollout

### Default Release Flow

1. Align on acceptance criteria and tests.
2. Implement in a branch.
3. Run local validation.
4. Open review or self-review against the checklist.
5. Merge to `main`.
6. CI validates on `main`.
7. Manually deploy to `staging` or `production` as appropriate.
8. Perform post-deploy verification.
9. Monitor for regressions.

### Post-Deploy Verification

Every production release should have a short verification checklist:

- homepage loads
- login and authentication flow still works
- core goal CRUD still works
- database-backed read and write path works
- logs show no startup or fatal errors

If a release touches a narrower or deeper area, add targeted checks for that area.

### Rollback Standard

Every non-trivial release should answer:

- what changed
- how to detect failure
- how to stop impact
- how to revert or mitigate

Rollback may be:

- redeploy previous image
- disable a feature flag
- stop a broken background job
- apply a compensating migration or manual fix

If rollback is hard, the change is too risky to treat casually.

## Database Release Strategy

Use expand-and-contract for risky schema evolution.

### Preferred Sequence

1. Add new schema in a backward-compatible way.
2. Deploy application code that supports both old and new schema if needed.
3. Backfill data safely.
4. Switch reads and writes fully to the new path.
5. Remove old schema in a later release.

### Database Change Checklist

Before production rollout, confirm:

- migration tested on a representative dataset when feasible
- long-running or locking behavior considered
- application startup does not depend on hidden schema changes
- rollback or mitigation path documented
- monitoring exists for the affected query path

### Current Migration Workflow

The current project rule is:

- schema changes live in SQL migration files under `server/migrations/`
- staging and production run migrations explicitly before backend rollout
- staging and production set `DB_AUTO_MIGRATE=false`
- local/dev may temporarily keep `DB_AUTO_MIGRATE=true` for lower friction
- existing databases created during the AutoMigrate era must be baselined once before relying on automated migration execution

## CI/CD Standards

## Current Workflow Problems

The current pipeline is a good start, but it still has important gaps:

- no dedicated frontend type-check-only gate separated from build feedback
- no required staging promotion rule for risky changes
- smoke checks are still minimal
- no explicit rollback automation

## Required CI Stages

Target CI should have these logical stages:

1. `static-check`
   - frontend lint
   - frontend type check
   - backend formatting or lint where adopted
   - backend vet

2. `test`
   - frontend tests
   - backend tests
   - coverage reporting if available

3. `build`
   - frontend production build
   - backend binary or image build

4. `package`
   - build and push Docker images

5. `deploy`
   - deploy only after required checks pass

6. `post-deploy-check`
   - smoke test against deployed environment

## Environment Strategy

Recommended target:

- `local`
  - developer machine
  - fast iteration

- `staging`
  - pre-production verification
  - same deployment shape as production as much as possible

- `production`
  - real traffic

Today the project appears to move from local directly to production. This is acceptable only temporarily.

Environment responsibilities and promotion rules are documented in [`docs/ENVIRONMENTS.md`](/Users/zhengyi/projects/starthere/docs/ENVIRONMENTS.md).

The current staging proposal is documented in [`docs/STAGING_DESIGN.md`](/Users/zhengyi/projects/starthere/docs/STAGING_DESIGN.md).

## Testing Policy

Testing strategy details live in [`docs/TESTING.md`](/Users/zhengyi/projects/starthere/docs/TESTING.md).

Operational rule:

- no meaningful behavior change should rely only on manual confidence
- tests are part of the release artifact, not a separate quality activity

## Logging Standards

Current state is not yet standardized. Move toward structured logs.

### Logging Rules

- use structured logs instead of free-form text where possible
- include request or trace correlation identifiers when available
- distinguish `info`, `warn`, `error`
- never log secrets, tokens, passwords, or raw sensitive payloads
- startup logs should include environment-safe configuration summary
- error logs should preserve enough context to diagnose the failure

### Minimum Backend Log Fields

- timestamp
- level
- service
- environment
- request id
- route or operation
- error message

## Monitoring And Alerting Standards

Monitoring should answer:

- Is the service up?
- Is it healthy?
- Is it slow?
- Is it failing?
- Since when?
- For which endpoints or flows?

### Minimum Production Monitoring

- uptime check for frontend
- uptime or health check for backend
- container restart monitoring
- HTTP error rate monitoring
- latency monitoring for key APIs
- database availability monitoring

### Minimum Alerts

- backend health check failing
- sustained 5xx spike
- repeated container restarts
- database connection failures
- certificate or domain expiry risk

Alerts should be actionable and low-noise. Start small and useful.

## Recommended Observability Stack

Choose simple tools first.

Suggested early-stage stack:

- health endpoints in backend
- structured application logs
- container log collection via platform or lightweight agent
- uptime monitoring via simple hosted checker or cloud monitor
- optional error tracking such as Sentry for frontend and backend

Avoid deploying a full observability platform too early unless operational pain justifies it.

## Infrastructure Backlog

Below is the recommended build-out plan based on current repo state.

The active engineering backlog is maintained in [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md).

### P0: Release Safety

- protect `main` and move to PR-based merge flow
- add frontend lint, test, and build to CI
- add backend format or lint consistency step
- define required CI checks for merge
- add production smoke test after deploy
- document manual rollback procedure

### P1: Database Safety

- introduce migration execution into deployment workflow
- define migration ownership and checklist
- separate schema migration from app container startup
- add migration status visibility in deployment logs

### P1: Environment Maturity

- create staging environment
- add staging secrets and deployment pipeline
- test release candidate in staging before production for risky changes

### P1: Observability

- add backend `/healthz` endpoint if not present
- use the existing backend health endpoint as a monitored deploy and uptime target
- standardize structured logs
- add uptime checks
- add error alerting
- add request id propagation

### P2: Developer Efficiency

- add reusable CI workflow or Make targets for common validation steps
- speed up CI with caching and narrower job boundaries
- add preview environments for frontend if product velocity justifies it
- adopt feature flags for incomplete high-risk work

### P2: Operational Hardening

- image vulnerability scanning
- dependency update automation
- backup and restore drill for database
- incident runbook for deploy failure and database rollback

## Priority Plan

Recommended order for the next few iterations:

1. CI gate completion
   - frontend lint, test, build
   - required checks on `main`

2. release safety
   - PR-based flow
   - deploy smoke test
   - rollback doc

3. database safety
   - migration process
   - migration checklist

4. observability basics
   - deploy and monitor against the existing health endpoint
   - structured logging
   - uptime alerts

5. staging
   - separate environment and verification path

## Non-Goals For Now

The following are useful, but not urgent right now:

- full microservice-style platform tooling
- heavy GitFlow process
- complex multi-stage release orchestration
- self-hosted full log and metrics platform on day one

Start lean, but do not stay informal forever.
