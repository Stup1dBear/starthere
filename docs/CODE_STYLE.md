# Code Style

> Code style rules for StartHere. This document is not a mirror of the current codebase. It is a guide for what should continue and what should stop spreading.

## Purpose

This document exists to make code quality more predictable across developer and agent contributions.

Use it to answer:

- what structure fits this repository
- which existing patterns are worth continuing
- which current patterns are acceptable but should be tightened
- which patterns should not spread further

This is a repository code-style document, not a language tutorial.

## Core Principles

Prefer code that is:

- easy to read locally
- explicit about ownership and data flow
- small enough to review with confidence
- consistent with the repository's structure
- simple before abstract

Avoid code that is:

- shaped around AI convenience instead of product needs
- over-commented to explain obvious mechanics
- loosely structured but "working for now"
- abstracted before repeated pressure exists
- tolerant of ambiguity in important behavior

## Current Codebase Assessment

The current repository has a useful base, but it is mixed quality.

Patterns worth keeping:

- frontend separation between pages, components, stores, services, and types
- backend separation between handlers, services, repositories, and packages
- store and service testing over brittle UI-only tests
- small repository methods with focused DB responsibility

Patterns that need tightening:

- pages that accumulate too much orchestration and layout logic
- stores that return weak success booleans without stronger domain signaling
- services that mix core domain logic with too much presentation or generated text logic
- comments that explain obvious code history rather than non-obvious intent

Patterns that should not spread:

- string-comparison error handling in backend handlers
- dead reference files kept around "for now"
- temporary explanatory comments aimed at the agent rather than future maintainers
- broad kitchen-sink components or services that own too many concerns

## General Rules

### Readability First

Code should be understandable without tracing too many files.

Good signs:

- names match behavior
- functions have one clear purpose
- control flow is straightforward
- hidden coupling is low

### Explicit Ownership

Each file should have a clear role.

Examples:

- page coordinates a screen
- component renders a focused UI slice
- store manages client state transitions
- service owns API interaction
- handler translates HTTP into service calls
- service owns business behavior
- repository owns persistence details

If a file starts doing multiple jobs, split it before it becomes the local pattern.

### Small Reviewable Units

Prefer small additions over broad rewrites.

If a change is hard to review, the structure is probably too implicit or too wide.

## Frontend Rules

## Frontend Structure

Use this responsibility split:

- `pages/`
  - route-level composition and screen orchestration
- `components/`
  - focused presentational or interaction units
- `stores/`
  - client-side state and async transitions that matter across components
- `services/`
  - API calls and request shaping
- `types/`
  - shared domain and transport types
- `routes/`
  - route guards and route-specific wrappers

Do not move API logic into components.
Do not move layout-heavy page concerns into stores.

## Page Rules

Pages may:

- coordinate screen sections
- wire stores and child components together
- hold small amounts of screen-local UI state
- derive lightweight view-specific data

Pages should not:

- accumulate large business rules
- perform heavy data transformation inline
- duplicate API request shaping
- turn into giant all-knowing screens

Current guidance:

- [HomePage.tsx](/Users/zhengkexiong/Programs/starthere/web/src/pages/HomePage.tsx) has a reasonable orchestration role, but it is already near the point where additional logic should move out into smaller view helpers or store selectors.

## Component Rules

Components should be focused and locally understandable.

Prefer components that:

- receive typed props
- do one visual or interaction job
- keep rendering logic close to the UI it affects

Avoid components that:

- fetch directly from APIs
- know too much about unrelated global state
- carry large piles of conditional rendering and derived business logic

## Store Rules

Stores may own:

- async actions that update shared client state
- request lifecycle state when it matters to the view
- cross-component UI state tied to domain flow

Stores should not become:

- a dumping ground for all frontend behavior
- a place for hidden derived business rules that the page cannot see
- a fake service layer with unrelated actions mixed together

Preferred store style:

- keep state shape explicit
- keep actions named by domain effect
- reset predictable state explicitly
- derive complex view-only data outside the store unless shared reuse is real

Current guidance:

- [starMapStore.ts](/Users/zhengkexiong/Programs/starthere/web/src/stores/starMapStore.ts) has acceptable scope, but future work should avoid scaling the `Promise<boolean>` pattern too far. For richer flows, prefer explicit result types or state transitions over weak true/false signaling.

## Service Rules

Services should:

- wrap API endpoints cleanly
- shape transport payloads
- return typed responses

Services should not:

- know about screen layout
- mutate UI state directly
- absorb domain orchestration that belongs in store or service layers elsewhere

Current guidance:

- [starApi.ts](/Users/zhengkexiong/Programs/starthere/web/src/services/starApi.ts) is close to the right size and style.
- [api.ts](/Users/zhengkexiong/Programs/starthere/web/src/services/api.ts) is directionally useful, but future edits should reduce commentary and keep behavior explicit rather than increasingly defensive and magical.

## Frontend Types

Keep shared domain types in `types/`.

Prefer:

- stable names
- narrow unions for domain states
- transport fields that match backend contracts deliberately

Avoid:

- anonymous inline object types repeated across files
- mixing domain types and UI-only prop types in the same place without reason

## Backend Rules

## Backend Structure

Use this responsibility split:

- `handler/`
  - HTTP binding, auth extraction, status mapping, response writing
- `service/`
  - business logic, validation, state transitions, orchestration
- `repository/`
  - persistence operations only
- `pkg/`
  - reusable technical utilities, not domain logic

This repository already has the right broad structure. Preserve it.

## Handler Rules

Handlers should:

- parse request input
- call exactly the needed service behavior
- translate service outcomes into HTTP responses
- stay thin

Handlers should not:

- contain real business logic
- build database queries
- compare fragile error strings as a normal control path

Current guidance:

- [star_handler.go](/Users/zhengkexiong/Programs/starthere/server/internal/handler/star_handler.go) and [auth_handler.go](/Users/zhengkexiong/Programs/starthere/server/internal/handler/auth_handler.go) show the right layering direction but use string-based error branching. Do not extend that pattern. Prefer typed errors or sentinel errors when refining backend behavior.

## Service Rules

Services should own:

- business validation
- domain state transitions
- orchestration across repositories and technical helpers

Services should not become:

- a catch-all for unrelated helper logic
- a dumping ground for formatting and presentation concerns
- impossible to test without the whole application booted

Current guidance:

- [star_service.go](/Users/zhengkexiong/Programs/starthere/server/internal/service/star_service.go) has meaningful domain logic, but it also mixes in companion-reply generation helpers. Avoid growing this pattern further; if message-generation logic becomes deeper, give it its own focused module.

## Repository Rules

Repositories should:

- express persistence intent clearly
- keep query logic localized
- return domain models or focused persistence results

Repositories should not:

- hold business rules
- mutate unrelated fields opportunistically
- leak storage details upward without reason

Current guidance:

- [star_repository.go](/Users/zhengkexiong/Programs/starthere/server/internal/repository/star_repository.go) and [user_repository.go](/Users/zhengkexiong/Programs/starthere/server/internal/repository/user_repository.go) are small and clear. This is closer to the pattern to preserve.

## Main And Wiring Rules

Application entrypoints may wire dependencies together, but they should not become business-logic files.

Current guidance:

- [main.go](/Users/zhengkexiong/Programs/starthere/server/cmd/api/main.go) is acceptable as a composition root, but keep pushing domain behavior downward into services instead of adding more policy into startup wiring.

## Naming Rules

Prefer names that reveal role, not implementation trivia.

Good examples:

- `CreateCheckIn`
- `ListStars`
- `FindByEmail`
- `submitCheckIn`

Avoid names that are:

- too generic
- tied to temporary implementation details
- inconsistent across frontend and backend layers

For booleans, prefer names that read as state:

- `isLoading`
- `isAuthenticated`
- `isVerified`

## Error Handling Rules

Make errors explicit and stable.

Prefer:

- typed or sentinel errors for expected control paths
- central response helpers for HTTP shape consistency
- clear mapping between service outcomes and handler status codes

Avoid:

- string matching on error messages as the long-term API between layers
- hiding important failure distinctions behind a generic error too early
- returning success booleans where richer result semantics are needed

## Comment Rules

Comments should explain intent, constraints, or non-obvious decisions.

Keep comments when they explain:

- why a rule exists
- why a fallback is necessary
- why a piece of behavior is intentionally unusual

Delete comments that:

- restate the next line
- describe obvious mechanics
- exist only to explain history that should be removed
- were written mainly to help code generation

Current guidance:

- [App.tsx](/Users/zhengkexiong/Programs/starthere/web/src/App.tsx) is a useful example of what not to normalize: a dead reference file plus explanatory comment is usually a cleanup target, not a style pattern.

## Abstraction Rules

Do not abstract on first sight of duplication.

Prefer abstraction only when:

- repeated pressure is real
- the shared concept is stable
- the abstraction reduces cognitive load

Avoid abstraction when it:

- hides simple control flow
- creates generic helpers no one wants to debug
- exists only because the code "looked repetitive"

## Testing Code Style

Tests should read like behavior checks, not implementation snapshots.

Prefer:

- focused test names
- explicit setup
- assertions tied to product behavior
- store and service tests for meaningful logic

Avoid:

- brittle rendering assertions for low-value details
- giant fixtures when a small one would do
- tests that merely mirror implementation structure

Current guidance:

- [starMapStore.test.ts](/Users/zhengkexiong/Programs/starthere/web/src/__tests__/starMapStore.test.ts) is closer to the right testing direction than purely cosmetic component tests.
- [star_service_test.go](/Users/zhengkexiong/Programs/starthere/server/internal/service/star_service_test.go) is useful but too narrow to represent the whole backend testing target. Future work should protect service behavior, not only helper functions.

## Cleanup Standard

Before calling code done, remove:

- temporary comments
- dead reference files
- experimental code paths with no accepted future
- ad hoc helpers that are not promoted intentionally

See [`docs/TASK_CLOSURE.md`](/Users/zhengkexiong/Programs/starthere/docs/TASK_CLOSURE.md) for closure rules.

## Current Repository Guidance

For StartHere right now:

- preserve the current broad layering
- push back against string-based backend error control flow
- keep frontend pages from becoming orchestration sinks
- prefer explicit state and typed boundaries over clever helper abstractions
- treat "AI wrote it and it works" as a starting point for review, not as proof of style quality
