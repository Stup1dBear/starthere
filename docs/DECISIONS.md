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

## 2026-03-23: Product Direction Focuses On Exploration Companionship

- Status: accepted
- Context:
  - The previous framing of StartHere centered on goals and completion, but it did not yet define a compelling daily loop.
  - Product discussion clarified that the strongest motivation is not generic productivity, but helping people keep pursuing meaningful long-term ambitions without feeling lost or alone.
- Decision:
  - StartHere should be positioned as a star-themed exploration companion for long-term personal projects.
  - The first deep user is the developer themself.
  - The first version should prioritize an assistant-led daily check-in loop and defer heavy social/community features.
- Why:
  - This direction better matches the founder's actual motivation, avoids collapsing into a generic todo or habit product, and creates a clearer path to a differentiated MVP.
- Consequences:
  - Product decisions should optimize for continuity, companionship, and visible progress through the process, not only completion.
  - The assistant should be designed as a witness and navigator rather than a maximalist autonomous agent.
  - Early social work should focus on lightweight fellow-traveler signals instead of a full public community.
- Related:
  - [`docs/PRODUCT_STRATEGY.md`](/Users/zhengyi/projects/starthere/docs/PRODUCT_STRATEGY.md)
  - [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md)

## 2026-03-23: Assistant Starts As A Calm Progress Companion

- Status: accepted
- Context:
  - Product discussion clarified that the assistant is central to the MVP, but trying to make it a deep co-creator too early would require more context than the first version can reliably hold.
  - The most important user failure modes are getting stuck and drifting away from meaningful long-term projects.
- Decision:
  - The assistant should prioritize `progress > witnessing > encouragement > co-creation`.
  - The first version should focus on identifying blockers, helping users restart after drift, and suggesting realistic next steps only when needed.
  - The assistant should remain honest that it is an AI, avoid pretending to share human feelings, and use a warm, calm, lightly playful tone.
- Why:
  - This keeps the product useful and trustworthy without overpromising emotional or strategic depth.
  - It matches the founder's intent to build a companion that helps people continue difficult pursuits rather than a generic powerful agent.
- Consequences:
  - Early assistant UX should optimize for natural check-ins, blocker diagnosis, and low-pressure re-entry.
  - Advice should be selective and preferably grounded in examples, patterns, or concrete context instead of generic planning output.
  - Deeper co-creation can be a later evolution after richer project memory exists.
- Related:
  - [`docs/PRODUCT_STRATEGY.md`](/Users/zhengyi/projects/starthere/docs/PRODUCT_STRATEGY.md)
  - [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md)
