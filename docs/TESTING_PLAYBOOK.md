# Testing Playbook

> Practical testing workflow for StartHere. This document translates testing principles into repeatable execution.

## Purpose

Use this document when deciding:

- what to test before implementing
- which checks to run for a given kind of change
- what counts as enough validation
- how to report what was and was not verified

This document complements [`docs/TESTING.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING.md).

- `docs/TESTING.md`
  - principles, expectations, and release standards
- `docs/TESTING_PLAYBOOK.md`
  - how to execute those expectations in this repository
- [`docs/FRONTEND_VALIDATION.md`](/Users/zhengkexiong/Programs/starthere/docs/FRONTEND_VALIDATION.md)
  - how frontend confidence should be split between functional checks, rendered evidence, and human visual judgment

## Core Principle

Testing should follow the task shape, not personal mood.

The goal is not to run every possible check every time.

The goal is to run the right checks for the risk being introduced.

## Current Reality

The repository already has:

- frontend unit-style tests with Vitest
- backend tests with Go's built-in test runner
- CI validation for frontend lint, frontend tests, frontend build, backend vet, and backend tests
- a smoke-test script used by deploy workflow

The repository also still has testing gaps:

- some frontend tests exercise logic patterns rather than the actual store implementation
- backend behavior coverage is still thin in service and handler layers
- the smoke script still reflects older goal-based flows and needs to be brought fully in line with the current star/check-in MVP path

This playbook should be used honestly against that reality.

## Test Layers In This Repo

Use these layers:

1. logic and store tests
2. service and handler tests
3. integration and API-boundary tests where useful
4. smoke checks for deployed environments
5. manual verification for visual and environment-specific behavior

## Before Implementation

For non-trivial work, define before coding:

- acceptance criteria
- main success path
- important edge cases
- likely regression points
- planned automated checks
- planned manual checks, if needed

If that list is unclear, the task is not ready to implement confidently.

## Task-Based Test Selection

## Feature Workflow

For a feature, usually do:

- add or update tests for the main success path
- add or update tests for important validation or error behavior
- run the affected layer checks
- run repo-level release checks for the changed side
- do manual verification if UI or environment behavior matters

## Bugfix Workflow

For a bugfix, usually do:

- write or update a regression test first when feasible
- confirm the failing behavior conceptually or concretely before the fix
- implement the smallest fix that addresses the cause
- rerun the regression and nearby checks

If no automated regression test is practical, record exactly why and what manual verification replaced it.

## Refactor Workflow

For a refactor, usually do:

- confirm existing tests cover the touched behavior
- add tests first if the touched behavior is currently unprotected
- run at least the affected layer checks plus repo-level validation for that side

Do not call a refactor "safe" if it only looks clean but has no behavioral protection.

## Frontend Playbook

Prefer automated frontend coverage for:

- store behavior
- route guards
- API client behavior at the boundary
- important form and submission behavior
- domain utilities

Less preferred targets:

- brittle styling assertions
- low-value snapshot-style tests
- tests that mainly restate MUI behavior

### Frontend Commands

From `web/`:

```bash
npm run lint
npm run test:run
npm run build
```

From repository root:

```bash
make test-web
```

`make test-web` uses the non-interactive test run path.

Use `npm run test:ui` or coverage locally when helpful, but do not require them for every task.

### Frontend Manual Checks

Do manual checks when the change affects:

- layout
- responsive behavior
- animation or motion
- visual hierarchy
- browser-only behavior

Typical manual checks:

- page loads without console-visible breakage
- key interaction path still works
- empty, loading, and error states still make sense
- desktop and mobile layouts do not obviously collapse

For meaningful UI work, also follow [`docs/FRONTEND_VALIDATION.md`](/Users/zhengkexiong/Programs/starthere/docs/FRONTEND_VALIDATION.md) so the close-out distinguishes:

- functional confidence
- structural confidence
- rendered evidence
- remaining visual judgment risk

## Backend Playbook

Prefer automated backend coverage for:

- service behavior
- auth behavior
- handler validation and status mapping
- repository behavior
- middleware behavior
- email and other adapters where practical

### Backend Commands

From `server/`:

```bash
go test ./...
go vet ./...
```

Or from repository root:

```bash
make test-server
```

For migrations or DB-sensitive changes, also use the migration commands and runtime checks that fit the task.

## Smoke Playbook

Smoke tests answer:

- is the deployed system up
- do the core public and authenticated paths still work

### Current Entrypoints

Local invocation:

```bash
make smoke-staging
```

Script:

- [`scripts/smoke_test.sh`](/Users/zhengkexiong/Programs/starthere/scripts/smoke_test.sh)

Validation and deploy workflows:

- [ci.yml](/Users/zhengkexiong/Programs/starthere/.github/workflows/ci.yml)
  - pre-deploy frontend and backend validation
- [deploy.yml](/Users/zhengkexiong/Programs/starthere/.github/workflows/deploy.yml)
  - deploy plus post-deploy public smoke checks

### Smoke Modes

- `basic`
  - web root
  - API health
- `deep`
  - authenticated flow plus critical MVP path

### Current Known Gap

The current smoke script still exercises older goal-based endpoints during deep smoke checks.

That does not match the accepted current MVP path.

Until it is updated, treat smoke confidence honestly:

- basic smoke is real
- deep smoke is only partially aligned with the current product flow

The backlog already tracks the needed move toward authenticated star/check-in smoke coverage.

## Migration And Data Change Playbook

For migration-affecting work:

- verify migration applies cleanly
- verify app behavior after migration
- understand rollback or mitigation path
- prefer representative data when practical

At minimum, pair migration changes with:

- backend tests
- migration command execution
- post-migration runtime verification on the affected path

## Test Waiver Rules

Sometimes a change cannot be covered well with automation yet.

That is allowed only if the close-out states:

- what was not automated
- why automation was not practical
- what manual verification replaced it
- what residual risk remains

Weak waiver:

- "did not add tests because this was small"

Acceptable waiver:

- "did not add automated coverage because the change was purely visual; verified loading, responsive layout, and interaction manually on desktop and mobile"

## Verification Reporting Format

A good testing report should say:

- automated checks run
- manual checks run
- checks intentionally not run
- failures encountered and resolved
- residual risk

Suggested format:

```md
Verification:

- Automated:
- Manual:
- Not Run:
- Residual Risk:
```

## What To Run By Change Type

### Frontend Logic Change

Usually run:

- `npm run lint`
- `npm run test:run`
- `npm run build`

### Backend Logic Change

Usually run:

- `go test ./...`
- `go vet ./...`

### Full-Stack Feature Change

Usually run:

- frontend lint, tests, build
- backend tests and vet
- targeted manual product flow check

### Deploy, Env, Auth, Or Integration Change

Usually run:

- side-specific automated checks
- smoke checks
- targeted manual verification on the changed path

### Visual-Only Change

Usually run:

- affected frontend checks as appropriate
- focused manual verification

Do not report a visual-only change as fully validated without rendered evidence and explicit treatment of residual visual risk.

Do not hide behind "visual-only" if logic changed too.

## Current Project Guidance

For StartHere right now:

- prefer store and service tests over brittle UI-only tests
- treat handler and service coverage as a current improvement area
- be honest that deep smoke coverage still needs to catch up with the current star/check-in MVP
- record manual verification explicitly whenever visual or deployment behavior is involved
- use [`docs/FRONTEND_VALIDATION.md`](/Users/zhengkexiong/Programs/starthere/docs/FRONTEND_VALIDATION.md) whenever frontend work needs screenshot-backed or human-reviewed confidence
