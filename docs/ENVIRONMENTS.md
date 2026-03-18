# Environments

> Environment strategy for StartHere. The goal is fast local iteration without unsafe direct-to-production habits.

## Purpose

Different environments exist to answer different questions.

- `local` answers: "Does the code behave correctly while I am building it?"
- `staging` answers: "Does the system behave correctly in a production-like deployment?"
- `production` answers: "Is the real service healthy for real users?"

Do not expect one environment to do all three jobs well.

## Environment Model

### Local

Use for:

- feature development
- test-driven development
- unit and integration tests
- rapid debugging
- API and UI iteration

Characteristics:

- fastest feedback loop
- may use mock data, local services, or reduced infrastructure
- safe to reset and experiment

Must happen in local first:

- implementation of new logic
- test writing
- basic regression checks
- most refactors

### Staging

Use for:

- pre-release verification
- production-like deployment validation
- database migration verification
- environment-specific integration testing
- smoke tests for risky changes

Characteristics:

- mirrors production architecture as closely as practical
- uses separate secrets and separate data
- should be deployable from CI

Staging should be required for:

- database schema changes
- authentication or authorization changes
- CI/CD and deployment changes
- Nginx, container, domain, CORS, or env wiring changes
- changes affecting core user journeys
- changes that are difficult to trust from local-only validation

### Production

Use for:

- serving real users
- final release monitoring
- incident response

Characteristics:

- highest change cost
- strongest verification expectations
- only validated changes should reach it

## Promotion Flow

Recommended promotion path:

1. Build and verify in `local`.
2. Merge or package through CI.
3. Deploy to `staging` for risky changes.
4. Run smoke and targeted regression checks in `staging`.
5. Deploy to `production`.
6. Run production smoke checks and monitor.

For very small and low-risk changes, `local -> CI -> production` may be acceptable temporarily. This should be the exception, not the long-term default.

## Local Vs Staging Decision Rules

Use `local` only when the change is mostly about code behavior and can be trusted from local validation:

- UI refinement
- isolated business logic
- small bug fixes
- low-risk refactors
- tests and docs changes

Use `staging` before production when the change depends on deployment shape or production-like behavior:

- migration and schema work
- cross-service or cross-layer integration
- auth, email, storage, external service integration
- network, proxy, and environment configuration
- release process changes

## Data Rules

- staging data must be separate from production data
- do not test risky changes directly against production data
- use seed data or sanitized fixtures where possible
- migration tests should assume realistic, imperfect data rather than only empty databases

## Staging Database Access

Default rule:

- staging database stays private on the cloud internal network
- do not expose the staging database directly to the public internet
- local debugging should go through an SSH tunnel via an ECS host that already has public access and internal-network reachability

Current staging database access path:

- staging DB host and bastion host are local-developer configuration, not hardcoded repo constants
- keep these values in a local, untracked config file
- recommended local forwarded port: `13306`

### Why This Is The Default

- keeps the database off the public internet
- avoids long-lived public TCP proxy exposure
- works with local SQL clients such as DBeaver, DataGrip, or `mysql`
- can be opened only when needed and closed immediately after debugging

### Tunnel Commands

From the repository root:

```bash
cp .staging-db-tunnel.example .staging-db-tunnel.local
# edit .staging-db-tunnel.local with your real bastion/db values

make open-staging-db-tunnel
make staging-db-tunnel-status
make close-staging-db-tunnel
```

These commands wrap [`scripts/staging_db_tunnel.sh`](/Users/zhengkexiong/Programs/starthere/scripts/staging_db_tunnel.sh).

When the tunnel is open, connect your local DB client to:

- host: `127.0.0.1`
- port: `13306`
- user/password: your staging DB credentials

### Direct SSH Form

If you want the raw command instead of the helper script:

```bash
ssh -N -L 13306:<staging-db-host>:3306 <bastion-host>
```

Keep that terminal open while using the tunnel. Stopping the SSH process closes the tunnel.

### Tunnel Helper Overrides

If you need a different local port, override it at runtime:

```bash
STAGING_DB_LOCAL_PORT=23306 make open-staging-db-tunnel
```

This is useful if `13306` is already occupied on your machine.

### Local Config File

Recommended local config file:

- [`.staging-db-tunnel.example`](/Users/zhengkexiong/Programs/starthere/.staging-db-tunnel.example)
- local untracked copy: `.staging-db-tunnel.local`

Example local config:

```bash
STAGING_DB_BASTION_HOST=star-there-ecs-openclaw-001
STAGING_DB_HOST=192.168.1.20
STAGING_DB_PORT=3306
STAGING_DB_LOCAL_PORT=13306
```

`.staging-db-tunnel.local` is gitignored and is the right place for developer-specific infrastructure coordinates.

## Mac Development And Linux Production

Developing on macOS is fine for this project.

You do not need a Linux development machine by default.

Why this is acceptable:

- frontend development is platform-friendly
- Go backend development is cross-platform
- Docker images can target Linux explicitly
- CI and staging should catch environment-specific issues better than trying to make every developer machine identical

### When macOS Is Enough

- normal frontend work
- backend business logic
- local containerized development
- test writing and refactoring

### When Linux-Specific Validation Matters

- file permission behavior
- container runtime quirks
- networking edge cases
- shell scripts that assume GNU/Linux tooling
- performance or ops debugging tied to the production host

The correct answer to Linux-specific risk is usually:

- CI on Linux runners
- staging on Linux infrastructure

not "everyone must switch development machines."

## Minimum Environment Plan For StartHere

Current likely path:

- `local`: already in use
- `production`: already in use
- `staging`: missing and should be added next

Recommended next step for staging:

- separate deploy target
- separate database
- separate secrets
- same container-based deployment shape
- stable staging URL

## Release Readiness Rule

Until staging exists:

- allow low-risk changes to go from local through CI to production
- require extra manual caution for medium and high-risk changes
- do not ship risky migration-heavy work casually

After staging exists:

- medium and high-risk changes should require staging verification before production
