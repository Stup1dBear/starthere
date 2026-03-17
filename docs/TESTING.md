# Testing Strategy

> Testing rules for StartHere. The goal is not test volume. The goal is behavior confidence.

## Principles

- tests protect product behavior, not ego
- tests should track acceptance criteria
- every important bug fix should try to leave behind regression coverage
- prefer a few high-value tests over many brittle tests
- if a change is hard to test, inspect the design before accepting the gap

## Test Pyramid

Use a practical pyramid:

- unit tests
  - pure logic
  - store logic
  - service logic
  - utility functions

- integration tests
  - handler to service boundaries
  - repository behavior
  - auth flow pieces
  - API client and state interaction

- end-to-end or smoke tests
  - critical user journeys only
  - login
  - core goal CRUD

Do not over-invest in brittle UI-only tests that duplicate lower-level coverage.

## Mandatory Test Expectations

### New Feature

Expect:

- tests for main success path
- tests for important edge cases
- tests for validation or error handling where behavior matters

### Bug Fix

Expect:

- a regression test that fails before the fix when feasible

### Refactor

Expect:

- existing tests still pass
- add tests first if the refactor touches logic that is currently unprotected

## Frontend Strategy

Prefer testing:

- store behavior
- state transitions
- route protection logic
- API integration boundaries
- important form validation behavior

Use manual verification in addition for:

- layout correctness
- animation and visual polish
- responsive behavior

Minimum frontend release checks:

- `npm run lint`
- `npm run test:run`
- `npm run build`

## Backend Strategy

Prefer testing:

- service logic
- auth logic
- repository behavior
- email adapter behavior where practical
- handler validation and error paths

Minimum backend release checks:

- `go test ./...`
- `go vet ./...`

Add stricter static tooling later if it improves signal rather than ceremony.

## Database Testing

For migration-affecting changes, verify:

- migration applies cleanly
- application still works against the migrated schema
- rollback or mitigation path is understood

For high-risk data changes, use a representative dataset when possible.

## Test Case Design

Before implementing non-trivial work, define:

- acceptance criteria
- critical success path
- known edge cases
- likely regression points

This should drive test authoring order.

## Release Regression Checklist

At minimum, protect these product flows:

- register and login
- token/session persistence behavior
- create goal
- edit goal
- milestone updates
- core authenticated page access

As the product grows, keep this checklist updated.

## Coverage Policy

Coverage is a signal, not the target.

- do not optimize for a vanity percentage
- do track whether critical code paths have meaningful tests
- raise concern when important modules have no protection at all

## When Automated Tests Are Not Enough

Use manual or staged verification when changes affect:

- visual fidelity
- browser-specific behavior
- infrastructure wiring
- production-only integrations

If relying on manual verification, record exactly what was checked.
