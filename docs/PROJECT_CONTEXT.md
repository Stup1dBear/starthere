# Project Context

> Fast-start engineering context for new developer or agent sessions.

## Purpose

This document is the quickest durable entry point into the project.

Read this first when starting a new session and use it to answer:

- what StartHere is building right now
- what the current engineering shape is
- which docs are the source of truth for product, workflow, testing, and operations
- what commands and entry points matter most

This document is intentionally short on history and long on actionable context.

## What StartHere Is

StartHere is a star-themed exploration companion for meaningful long-term personal projects.

The current MVP is not a generic task manager.

It focuses on a simple loop:

- the user returns to an important star
- the user writes a short check-in
- the assistant responds in a calm, useful way
- the product helps the user reconnect and continue

For the full product direction, read [`docs/PRODUCT_STRATEGY.md`](/Users/zhengkexiong/Programs/starthere/docs/PRODUCT_STRATEGY.md).

## Current Project Priorities

Current engineering and workflow priorities are tracked in [`docs/BACKLOG.md`](/Users/zhengkexiong/Programs/starthere/docs/BACKLOG.md).

As of now, the most important priorities are:

- build a safer release path through staging
- strengthen smoke and regression coverage for the assistant-first MVP loop
- continue improving repository quality and workflow maturity

Do not rely on this file for the live TODO list. Use the backlog.

## Engineering Shape

The repository is currently a single-project codebase with:

- `web/`
  - React + TypeScript + Vite frontend
- `server/`
  - Go backend
- `docs/`
  - source-of-truth project documentation
- `deploy/`
  - deployment-related assets
- `scripts/`
  - operational helper scripts

## Product And System Reality

Important current-state reminders:

- this is a real product repo, not a tutorial sandbox
- collaboration defaults to engineering delivery mode
- the product direction has moved from generic goal tracking toward assistant-guided exploration companionship
- release safety is improving, but still incomplete
- staging exists as a major workflow priority and should remain part of the operating model

## Must-Read Documents

These are the highest-value documents for new sessions:

- [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md)
  - collaboration rules, decision boundaries, documentation protocol
- [`docs/WORKFLOWS.md`](/Users/zhengkexiong/Programs/starthere/docs/WORKFLOWS.md)
  - how work moves from exploration to implementation and retrospective
- [`docs/AGENT_REVIEW.md`](/Users/zhengkexiong/Programs/starthere/docs/AGENT_REVIEW.md)
  - shared review and challenge rules for the developer and the agent
- [`docs/CODE_STYLE.md`](/Users/zhengkexiong/Programs/starthere/docs/CODE_STYLE.md)
  - repository code style rules and anti-patterns for frontend and backend work
- [`docs/DESIGN_EXPLORATION.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_EXPLORATION.md)
  - how visual direction should be explored before it is treated as stable
- [`docs/DESIGN_DECISION_LOG.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_DECISION_LOG.md)
  - durable record of visual exploration rounds
- [`docs/FRONTEND_VALIDATION.md`](/Users/zhengkexiong/Programs/starthere/docs/FRONTEND_VALIDATION.md)
  - what frontend work can be validated automatically, what needs rendered evidence, and what still needs human judgment
- [`docs/PRODUCT_STRATEGY.md`](/Users/zhengkexiong/Programs/starthere/docs/PRODUCT_STRATEGY.md)
  - product vision and MVP direction
- [`docs/BACKLOG.md`](/Users/zhengkexiong/Programs/starthere/docs/BACKLOG.md)
  - current priorities and active follow-up work
- [`docs/TESTING.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING.md)
  - testing expectations and minimum release checks
- [`docs/ENGINEERING_OPERATIONS.md`](/Users/zhengkexiong/Programs/starthere/docs/ENGINEERING_OPERATIONS.md)
  - branch, release, migration, and deployment rules
- [`docs/ENVIRONMENTS.md`](/Users/zhengkexiong/Programs/starthere/docs/ENVIRONMENTS.md)
  - local, staging, and production responsibilities
- [`docs/DECISIONS.md`](/Users/zhengkexiong/Programs/starthere/docs/DECISIONS.md)
  - accepted engineering and workflow decisions

## Default Session Start

For a normal new session, read in roughly this order:

1. [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md)
2. [`docs/PROJECT_CONTEXT.md`](/Users/zhengkexiong/Programs/starthere/docs/PROJECT_CONTEXT.md)
3. [`docs/WORKFLOWS.md`](/Users/zhengkexiong/Programs/starthere/docs/WORKFLOWS.md)
4. [`docs/AGENT_REVIEW.md`](/Users/zhengkexiong/Programs/starthere/docs/AGENT_REVIEW.md)
5. whichever domain-specific document fits the task, such as code style, design exploration, testing, or operations

Then inspect the actual code and tests before proposing changes.

## Developer Context That Matters

The developer is strong in backend and infrastructure work.

Practical implications for collaboration:

- frontend explanations should be concrete and technically accurate
- do not give condescending tutorial-style guidance unless teaching is explicitly requested
- challenge weak ideas directly and respectfully
- optimize for maintainable delivery over impressive-looking abstractions

## Local Development Entry Points

Useful default commands from the repository root:

```bash
make doctor
```

Use this first to check the local environment.

Frontend:

```bash
cd web
npm ci
npm run dev
```

Backend:

```bash
cd server
go mod tidy
go run ./cmd/api/main.go
```

Local MySQL only:

```bash
docker compose up -d mysql
```

Full local container environment:

```bash
docker compose up -d
```

For more setup details, use [`docs/DEVELOPMENT.md`](/Users/zhengkexiong/Programs/starthere/docs/DEVELOPMENT.md).

## Collaboration Rules Worth Remembering

These are the highest-signal collaboration rules for new sessions:

- inspect the relevant code before proposing implementation
- for non-trivial work, align on scope, non-goals, acceptance criteria, and verification
- use exploration first when the task is still fuzzy
- switch to delivery mode once the direction is stable
- testing is part of delivery, not optional polish
- durable docs should be updated when behavior, workflow, or decisions change

## When This Document Should Change

Update this file when:

- the project's current engineering shape changes materially
- the default session entry documents change
- the fast-start understanding of the product or repository becomes outdated

Do not turn this file into:

- a backlog
- a decision log
- a learning diary
- a duplicate of product strategy or testing rules
