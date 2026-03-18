# Backlog

> Single source of truth for engineering TODOs and near-term priorities.

## How We Use This File

This file is the primary project backlog.

Rules:

- new actionable engineering TODOs should land here
- keep items concrete and outcome-oriented
- prefer fewer, clearer items over long wishlists
- finished items should be moved to a changelog or marked done here and cleaned up periodically
- scattered TODOs in other docs should be converted into backlog items when they become real work

This file should stay understandable to both the developer and the agent in a fresh conversation.

## Priority Levels

- `P0`
  - blocks safe delivery or production reliability
- `P1`
  - important next work that materially improves delivery safety or product capability
- `P2`
  - useful improvement, but not urgent
- `P3`
  - optional or exploratory

## Status Labels

- `todo`
- `in_progress`
- `blocked`
- `done`

## Active Priorities

### P0

- `in_progress` Build a staging environment
  - Goal: introduce a production-like test environment between local and production
  - Why: current workflow goes from local to production directly, which is too risky for schema, auth, and deployment changes
  - Done when: staging deploy target, secrets, URL, and smoke-check flow exist

- `done` Complete CI gates before deploy
  - Goal: require frontend lint, frontend tests, frontend build, backend tests, and backend vet before production deployment
  - Why: current CI protects backend only and leaves frontend regressions under-guarded
  - Done when: GitHub Actions blocks deploy on all required checks

### P1

- `todo` Run a repository quality scan and targeted refactor pass
  - Goal: identify code and workflow areas that violate the current engineering standards, then fix the highest-value issues
  - Why: the project is still small enough to clean up without major rewrite cost
  - Done when: findings are documented, prioritized, and the most important issues are fixed or scheduled

- `todo` Standardize production smoke tests
  - Goal: verify core user journeys immediately after deploy
  - Why: container startup alone is not enough release confidence
  - Done when: smoke checks are defined and automated or clearly scripted

- `done` Define database migration workflow
  - Goal: make schema changes safe, reviewable, and repeatable
  - Why: migrations exist but are not yet integrated into release flow
  - Done when: migration checklist, execution path, and rollback guidance are documented and used

### P2

- `todo` Standardize logging and health-based monitoring
  - Goal: make production failures easier to detect and diagnose
  - Done when: structured logs, health monitoring, and basic alerts are in place

- `todo` Consolidate outdated docs
  - Goal: align older docs with current workflow and remove contradictory guidance
  - Done when: duplicated or stale process docs are updated or deprecated

- `todo` Establish recurring workflow reviews
  - Goal: review collaboration quality, delivery friction, and external agent-engineering practices on a regular cadence
  - Why: workflow quality will drift if it is not reviewed against real evidence
  - Done when: a lightweight review cadence, template, and update path are actively used

## Current Recommendation

Recommended next sequence:

1. Build staging environment.
2. Complete CI gates.
3. Add smoke test path.
4. Perform repository quality scan and targeted refactor pass.

## Execution Phases

### Phase 1: Release Safety Foundation

- Build staging environment
- Complete CI gates before deploy

Exit criteria:

- there is a production-like environment outside local
- both frontend and backend have required CI validation before production deploy

### Phase 2: Controlled Release Path

- Standardize production smoke tests
- Define database migration workflow

Exit criteria:

- risky changes have a defined validation path
- deploys include both pre-release and post-release safety checks

### Phase 3: Codebase Quality Pass

- Run a repository quality scan and targeted refactor pass
- Consolidate outdated docs

Exit criteria:

- the most important code quality and workflow issues are documented and either fixed or scheduled
- process docs reflect actual practice

### Phase 4: Observability And Workflow Maturity

- Standardize logging and health-based monitoring
- Establish recurring workflow reviews

Exit criteria:

- production issues are easier to detect and diagnose
- workflow improvement becomes routine rather than reactive

## Intake Rule

When a new TODO appears, capture:

- the problem
- why it matters
- the expected outcome
- the priority
- whether it blocks shipping

If an item cannot be described that clearly, it is not ready for the backlog yet.
