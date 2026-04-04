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

## 2026-04-04: Exploration-Convergence-Delivery Is The Default Collaboration Flow

- Status: accepted
- Context:
  - Product and workflow discussions in this project often begin as partially formed ideas rather than implementation-ready tasks.
  - The collaboration works best when both the developer and the agent can explore, challenge, and narrow ideas before switching into engineering delivery mode.
- Decision:
  - The default non-trivial collaboration flow is `explore -> challenge -> converge -> plan -> implement -> verify -> persist`.
  - Exploration is allowed, but implementation should not begin until scope, non-goals, acceptance criteria, and verification are explicit enough.
  - This execution flow should be documented durably in [`docs/WORKFLOWS.md`](/Users/zhengkexiong/Programs/starthere/docs/WORKFLOWS.md).
- Why:
  - This preserves room for product and architecture thinking without letting idea discussions drift endlessly or collapse into premature coding.
  - It also makes the agent a stronger collaborator by making challenge and convergence part of the expected process rather than ad hoc behavior.
- Consequences:
  - New conversations should be able to identify which workflow is active and what output is required before moving to the next stage.
  - Workflow discussions should produce durable artifacts instead of relying on chat memory.
- Related:
  - [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md)
  - [`docs/WORKFLOWS.md`](/Users/zhengkexiong/Programs/starthere/docs/WORKFLOWS.md)

## 2026-04-04: Review And Challenge Are Shared Delivery Responsibilities

- Status: accepted
- Context:
  - The project expects the agent to act as more than a code generator, but that expectation was previously spread across tone guidance and general collaboration rules.
  - The developer also needs a clear standard for when pushback and review should happen, rather than treating review as an agent-only behavior.
- Decision:
  - Review is a shared delivery responsibility between the developer and the agent.
  - Non-trivial work should use explicit pre-implementation review, implementation review, and release review as appropriate.
  - The rules for challenge, escalation, and review outputs should live in [`docs/AGENT_REVIEW.md`](/Users/zhengkexiong/Programs/starthere/docs/AGENT_REVIEW.md).
- Why:
  - This makes review predictable, teaches both sides what "good rigor" looks like, and reduces the chance that risky work slips through because nobody paused to challenge it.
- Consequences:
  - The developer can expect explicit pushback and review on risky work instead of passive execution.
  - The agent is expected to identify weak tradeoffs, missing tests, and rollout risks as part of normal delivery.
- Related:
  - [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md)
  - [`docs/AGENT_REVIEW.md`](/Users/zhengkexiong/Programs/starthere/docs/AGENT_REVIEW.md)

## 2026-04-04: Parallel Work Uses Worktrees Sparingly And Requires Explicit Closure

- Status: accepted
- Context:
  - The project needs a way to handle real concurrent work, but unmanaged worktrees and leftover task artifacts create confusion, dirty baselines, and rework.
  - Using `git worktree` alone is not enough; the project also needs baseline, tracking, integration, and cleanup rules.
- Decision:
  - Parallel development is allowed when tasks are genuinely independent and worth isolating, but serial execution remains the default.
  - `git worktree` should be used sparingly for real concurrent tracks, not as the default for every task.
  - Parallel tasks must start from clean explicit baselines and should be tracked durably.
  - Task completion includes cleanup of temporary artifacts, stale workspaces, and outdated documentation.
  - These operating rules live in [`docs/PARALLEL_DEVELOPMENT.md`](/Users/zhengkexiong/Programs/starthere/docs/PARALLEL_DEVELOPMENT.md) and [`docs/TASK_CLOSURE.md`](/Users/zhengkexiong/Programs/starthere/docs/TASK_CLOSURE.md).
- Why:
  - This preserves the benefits of isolation without turning the repository into a pile of abandoned worktrees, half-finished branches, and task debris.
  - It also creates a shared standard for deciding what temporary output should be promoted, deleted, or recorded as follow-up work.
- Consequences:
  - New parallel tasks should justify their isolation approach and record their baseline and status.
  - Merged or abandoned work should be explicitly closed out rather than left behind in the working environment.
- Related:
  - [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md)
  - [`docs/PARALLEL_DEVELOPMENT.md`](/Users/zhengkexiong/Programs/starthere/docs/PARALLEL_DEVELOPMENT.md)
  - [`docs/TASK_CLOSURE.md`](/Users/zhengkexiong/Programs/starthere/docs/TASK_CLOSURE.md)

## 2026-04-04: Repository Code Style Should Be Critical, Not Historical

- Status: accepted
- Context:
  - Much of the existing repository code was generated without strong prior style constraints.
  - The project needs code-style guidance, but copying the current codebase mechanically would preserve weak AI-generated patterns along with the good ones.
- Decision:
  - Repository code style guidance should be based on both current repository structure and critical engineering judgment, not on the assumption that existing code is already the right model.
  - The project should keep its useful layering patterns while explicitly discouraging fragile practices such as string-based error branching, dead reference files, and overgrown orchestration components.
  - These rules live in [`docs/CODE_STYLE.md`](/Users/zhengkexiong/Programs/starthere/docs/CODE_STYLE.md).
- Why:
  - This allows the project to mature its code quality without requiring a full rewrite or pretending the current code is uniformly strong.
- Consequences:
  - New contributions should follow the documented target style even when some older files do not yet meet it.
  - Review should treat existing weak patterns as cleanup candidates, not precedents.
- Related:
  - [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md)
  - [`docs/CODE_STYLE.md`](/Users/zhengkexiong/Programs/starthere/docs/CODE_STYLE.md)

## 2026-04-04: Visual Direction Should Use Exploration And Evidence Before Style Fixation

- Status: accepted
- Context:
  - StartHere has meaningful product and emotional anchors, but its visual language is not stable enough yet for a fully rigid design-style document.
  - The developer wants room to try and validate different directions, and text-only reasoning is not enough to judge visual quality confidently.
- Decision:
  - The project should use a design-exploration workflow before locking a final design style.
  - Visual conclusions should be recorded as exploration rounds and only promoted into stable design rules after visible comparison and review.
  - These rules live in [`docs/DESIGN_EXPLORATION.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_EXPLORATION.md) and [`docs/DESIGN_DECISION_LOG.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_DECISION_LOG.md).
- Why:
  - This keeps the project honest about uncertainty, gives the agent a useful role in design exploration without overclaiming design certainty, and avoids freezing weak visual ideas into fake standards.
- Consequences:
  - Visual work should focus on clearly defined exploration variables and visible comparison, not only descriptive discussion.
  - A future `docs/DESIGN_STYLE.md` should be created only after enough stable design evidence exists.
- Related:
  - [`docs/PRODUCT_STRATEGY.md`](/Users/zhengkexiong/Programs/starthere/docs/PRODUCT_STRATEGY.md)
  - [`docs/DESIGN_EXPLORATION.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_EXPLORATION.md)
  - [`docs/DESIGN_DECISION_LOG.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_DECISION_LOG.md)

## 2026-04-04: Testing Needs A Practical Playbook, Not Principles Alone

- Status: accepted
- Context:
  - The repository already has testing principles, CI checks, and some smoke automation, but there is still friction in deciding what to run for a given task and how to report confidence honestly.
  - Some existing tests and smoke paths also lag behind the current product shape.
- Decision:
  - The project should maintain a practical testing playbook alongside its testing strategy document.
  - The playbook should define task-based test selection, execution commands, waiver rules, smoke expectations, and verification reporting.
  - These execution rules live in [`docs/TESTING_PLAYBOOK.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING_PLAYBOOK.md).
- Why:
  - This reduces ambiguity during delivery, helps the developer and agent choose proportionate validation, and makes it easier to report actual confidence rather than implied confidence.
- Consequences:
  - New tasks should refer to the playbook when deciding which automated and manual checks to run.
  - Known mismatches between current automation and current product flow should be called out explicitly rather than ignored.
- Related:
  - [`docs/TESTING.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING.md)
  - [`docs/TESTING_PLAYBOOK.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING_PLAYBOOK.md)
