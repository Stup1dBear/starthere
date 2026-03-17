# Decisions

> Durable record of important engineering and workflow decisions.

## How We Use This File

This file records decisions that are already made.

Use it for:

- workflow decisions
- architecture choices
- release process decisions
- environment strategy decisions
- agent collaboration decisions

Do not use it for:

- raw brainstorming
- temporary notes
- future ideas that are not yet agreed

If something is still undecided, keep it in [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md) or a task-specific plan instead.

## Template

```md
## YYYY-MM-DD: Decision Title

- Status: accepted | replaced
- Context:
- Decision:
- Why:
- Consequences:
- Related:
```

## 2026-03-15: Default Collaboration Mode Is Engineering Delivery

- Status: accepted
- Context:
  - StartHere is a real product intended for real users, not a toy or tutorial project.
- Decision:
  - Default agent collaboration mode is engineering delivery mode, not teaching mode.
- Why:
  - Delivery quality, correctness, maintainability, and operational safety are the primary goals.
- Consequences:
  - Teaching is still available, but only when explicitly requested.
  - Non-trivial work must align on acceptance criteria and verification before implementation.
- Related:
  - [`AGENTS.md`](/Users/zhengyi/projects/starthere/AGENTS.md)

## 2026-03-15: Documentation Uses A Source-Of-Truth Model

- Status: accepted
- Context:
  - Previous documentation drifted because process details were spread across multiple files and chat context.
- Decision:
  - Each concern should have one primary document, and updates should follow the documentation update protocol.
- Why:
  - This reduces drift, ambiguity, and context loss across new conversations and agent sessions.
- Consequences:
  - `AGENTS.md` acts as a map, while deeper process details live under `docs/`.
  - Durable artifacts are preferred over relying on conversation history.
- Related:
  - [`AGENTS.md`](/Users/zhengyi/projects/starthere/AGENTS.md)
  - [`docs/WORKFLOW_REVIEW.md`](/Users/zhengyi/projects/starthere/docs/WORKFLOW_REVIEW.md)

## 2026-03-15: Testing Is Part Of Delivery

- Status: accepted
- Context:
  - The project needs stronger safeguards against requirement drift and regressions.
- Decision:
  - Non-trivial work should follow a test-guided workflow, and meaningful behavior changes require planned verification.
- Why:
  - Reliable delivery needs acceptance criteria, regression protection, and explicit validation.
- Consequences:
  - Test strategy must be discussed before implementing meaningful changes.
  - Bug fixes should usually leave behind regression coverage.
- Related:
  - [`docs/TESTING.md`](/Users/zhengyi/projects/starthere/docs/TESTING.md)

## 2026-03-15: Staging Is A Required Next Step

- Status: accepted
- Context:
  - The current project workflow effectively moves from local directly to production.
- Decision:
  - A staging environment is a P0 infrastructure milestone for this project.
- Why:
  - Database, auth, deployment, and environment-specific changes should not rely on local validation alone before production.
- Consequences:
  - Medium and high-risk changes should eventually pass through staging before production rollout.
- Related:
  - [`docs/ENVIRONMENTS.md`](/Users/zhengyi/projects/starthere/docs/ENVIRONMENTS.md)
  - [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md)
