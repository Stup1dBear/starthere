# Workflows

> Execution flows for how the developer and agent should move from ideas to validated delivery work.

## Purpose

This document exists to make collaboration executable instead of conversationally implicit.

Use it to answer:

- what phase the current work is in
- whether we should still be exploring or should already be implementing
- what information must exist before moving forward
- what gets written into durable docs after the work is stable

This document complements:

- [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md) for collaboration rules and boundaries
- [`docs/TESTING.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING.md) for validation standards
- [`docs/WORKFLOW_REVIEW.md`](/Users/zhengkexiong/Programs/starthere/docs/WORKFLOW_REVIEW.md) for improving the workflow itself

## Core Principle

Default collaboration mode for this project is:

`explore -> challenge -> converge -> plan -> implement -> verify -> persist`

This is a good fit for StartHere because product and engineering ideas still need room to evolve, but delivery quality still matters.

The key rule is:

- exploration is allowed
- wandering is not

Every exploratory conversation must eventually produce one of these outcomes:

- a clear direction to implement
- a clear list of blocked questions
- a decision not to proceed
- a backlog item for later

## Workflow Selection

Use the workflow that best matches the task:

- idea, product direction, architecture shape, or vague request
  - use the Exploration Workflow
- new feature with expected code changes
  - use the Feature Workflow
- bug, regression, or behavior mismatch
  - use the Bugfix Workflow
- review of existing code, plan, or change
  - use the Review Workflow
- looking back on friction, mistakes, or process drift
  - use the Retrospective Workflow

If a task changes category during discussion, say so explicitly and switch workflows.

## Exploration Workflow

Use this when the initial request is still fuzzy, strategic, or idea-heavy.

### Goal

Turn raw ideas into an implementable direction without prematurely writing code.

### Flow

1. Problem framing
   - clarify the problem, motivation, constraints, and why it matters now
2. Joint exploration
   - the developer proposes ideas
   - the agent challenges weak ideas, supports strong ones, and introduces alternatives
3. Direction narrowing
   - reduce the discussion to a small number of viable options
4. Convergence
   - agree on one direction, or explicitly keep multiple options open if a decision is still risky
5. Implementation planning
   - define scope, non-goals, acceptance criteria, and verification approach
6. Handoff
   - switch to a delivery workflow such as Feature or Bugfix

### Required Output Before Implementation

Before writing code or making non-trivial doc changes, the exploration should produce:

- the problem being solved
- what is in scope
- what is out of scope
- the preferred approach
- major tradeoffs or rejected alternatives
- how success will be verified

### Agent Responsibilities

- challenge weak or vague directions
- avoid pretending uncertainty does not exist
- suggest simpler and more reliable options when available
- stop the conversation from endlessly expanding
- convert discussion into explicit implementation criteria

### Developer Responsibilities

- bring ideas, constraints, and reactions openly
- approve or reject proposed directions clearly
- confirm when a direction is stable enough to implement
- flag when the conversation is still exploratory and should not yet collapse into code

### Exit Criteria

Leave the Exploration Workflow when one of these is true:

- there is a clear implementation direction
- the remaining uncertainty is small and low-risk
- the work should be deferred to backlog
- the idea should be rejected

## Feature Workflow

Use this for non-trivial new capability work.

### Flow

1. Inspect the affected code and docs first.
2. Restate the goal, non-goals, and acceptance criteria.
3. Define the test strategy before implementation.
4. Implement in small reviewable steps.
5. Run targeted validation.
6. Update durable docs if behavior, workflow, or decisions changed.
7. Summarize what changed, what was verified, and remaining risks.

### Minimum Inputs

- feature goal
- affected area
- acceptance criteria
- planned verification

### Minimum Verification

Use the relevant checks from [`docs/TESTING.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING.md).

At minimum:

- tests for meaningful behavior changes
- lint, type-check, build, or backend validation as appropriate
- manual checks when automation is insufficient

## Bugfix Workflow

Use this when behavior is wrong, regressed, or unreliable.

### Flow

1. Define the observed behavior and the expected behavior.
2. Identify reproduction steps or strongest available evidence.
3. Inspect the relevant code path before proposing a fix.
4. Define the regression test or verification method first.
5. Implement the smallest fix that actually addresses the cause.
6. Verify the fix and confirm no obvious nearby regression.
7. Record follow-up cleanup only if truly needed.

### Required Output

- bug statement
- expected behavior
- cause or best current hypothesis
- regression coverage or explicit reason it was not feasible

### Rule

Do not treat bugfixes as an excuse for unrelated refactors unless the refactor is required for correctness.

## Review Workflow

Use this when reviewing code, plans, docs, or architecture.

### Goal

Find defects, regressions, weak assumptions, and missing validation before they become expensive.

### Review Order

1. correctness and regressions
2. acceptance-criteria gaps
3. test and verification gaps
4. operational or migration risk
5. maintainability concerns

### Expected Output

- findings first, ordered by severity
- file references where possible
- open questions or assumptions
- short summary only after findings

### Review Types

- pre-implementation review
  - challenge the plan before code exists
- implementation review
  - inspect changes for correctness and coverage
- release review
  - check rollout, smoke, rollback, and ops risk

## Retrospective Workflow

Use this after friction, repeated mistakes, releases, or major milestones.

### Goal

Improve the workflow based on evidence rather than vibes.

### Inputs

- current source-of-truth docs
- recent backlog items
- relevant git history
- CI, staging, or production outcomes
- conversation artifacts when available

### Output Format

- Working
- Problems
- Changes
- Backlog

Completed retrospectives should be recorded in [`docs/RETROSPECTIVES.md`](/Users/zhengkexiong/Programs/starthere/docs/RETROSPECTIVES.md).

## Phase Transition Rules

The most important transition in this project is:

`exploration -> implementation`

Do not cross that boundary casually.

Before implementation starts for non-trivial work, confirm:

- the problem is clear
- the direction is chosen
- acceptance criteria exist
- test strategy exists
- major unknowns are surfaced

If those conditions are not true, stay in exploration.

Once implementation starts:

- do not reopen broad brainstorming unless new evidence forces it
- keep discussion tied to delivery
- record any newly discovered uncertainty explicitly

## Documentation Rules

When work done through these workflows becomes stable:

- update [`docs/DECISIONS.md`](/Users/zhengkexiong/Programs/starthere/docs/DECISIONS.md) for accepted decisions
- update [`docs/BACKLOG.md`](/Users/zhengkexiong/Programs/starthere/docs/BACKLOG.md) for follow-up work
- update [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md) if collaboration rules changed
- update domain-specific docs if product, engineering, environment, or testing rules changed

## Current Project Guidance

For StartHere right now:

- use Exploration Workflow for product shape, assistant behavior, architecture direction, and major workflow changes
- use Feature Workflow for normal implementation after convergence
- use Bugfix Workflow for regressions and reliability problems
- use Review Workflow aggressively before deploys, migrations, and broad refactors
- use Retrospective Workflow whenever the same collaboration or delivery problem appears twice
