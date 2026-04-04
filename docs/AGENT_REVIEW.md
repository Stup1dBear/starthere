# Agent Review

> Shared review and challenge rules for both the developer and the agent.

## Purpose

This document exists to make review an explicit part of delivery instead of an optional personality trait.

Use it to answer:

- when the agent should challenge an idea instead of executing it
- when the developer should expect pushback instead of compliance
- what kind of review should happen before, during, and after implementation
- what output a useful review should produce

This document is for both sides.

- the agent uses it to decide how to review and challenge
- the developer uses it to judge whether the collaboration is rigorous enough

## Core Principle

The agent is not only an implementation tool.

The agent is also expected to act as:

- a design critic
- a risk reviewer
- a regression hunter
- a scope-control partner

The goal is not opposition for its own sake.

The goal is:

- stronger decisions
- fewer weak implementations
- less avoidable rework

## What Good Review Means Here

Good review should:

- challenge unclear or weak assumptions early
- find correctness and regression risks before merge or deploy
- reduce wasted work from vague requirements
- keep the project aligned with product and engineering standards

Good review should not:

- block progress over low-value theoretical concerns
- reopen settled decisions without new evidence
- turn every task into architecture debate
- nitpick style before correctness and safety

## Review Triggers

Review should happen when:

- the task is non-trivial
- the requirements are underspecified
- the design introduces new abstraction or structure
- the change affects user-visible behavior
- the change affects APIs, schema, migrations, or release flow
- the task touches authentication, environment wiring, or external dependencies
- the same kind of bug or friction has happened before

## Review Layers

Use three review layers by default.

### 1. Pre-Implementation Review

Happens before coding.

Goal:

- challenge the direction before cost is sunk into implementation

Questions:

- are we solving the right problem
- is the scope clear
- is there a simpler option
- what are the hidden assumptions
- what should be tested
- what should not be done in this task

Required output:

- confirmed goal
- non-goals
- acceptance criteria
- implementation approach
- risks and tradeoffs
- verification plan

### 2. Implementation Review

Happens after code or doc changes exist.

Goal:

- catch correctness, regression, and maintainability issues before the task is called done

Review order:

1. correctness
2. regression risk
3. acceptance-criteria coverage
4. test coverage and verification quality
5. maintainability

Required output:

- findings first
- severity order when there are multiple findings
- file references when possible
- explicit note if no findings were found

### 3. Release Review

Happens before deploy or merge for risky changes.

Goal:

- check whether the rollout path is safer than the failure path

Questions:

- what changed
- what can fail
- how would we detect failure
- what smoke checks are required
- what is the rollback or mitigation path

Required output:

- rollout checklist
- smoke plan
- rollback understanding
- known residual risk

## Responsibilities

## Agent Responsibilities

The agent should:

- challenge weak, vague, or overcomplicated ideas
- say plainly when a design is a bad tradeoff
- suggest a simpler or safer alternative when rejecting a direction
- identify missing tests and missing acceptance criteria
- review its own implementation critically after making changes
- surface fragility honestly instead of protecting momentum artificially

The agent should not:

- obey obviously weak directions without comment
- hide uncertainty behind polished wording
- default to large rewrites when a narrow change is enough
- continue implementation when ambiguity materially changes behavior

## Developer Responsibilities

The developer should:

- treat challenge as part of the workflow, not resistance
- clarify product intent when ambiguity changes the shape of the solution
- approve or reject tradeoffs explicitly
- expect review before calling non-trivial work done
- ask for stronger review when the task is risky or subtle

The developer should not:

- treat every challenge as delay
- assume the agent should fill product gaps by guessing
- collapse review and implementation into one unexamined step for risky work

## Pushback Standard

Pushback should be direct, calm, and specific.

Good patterns:

- "I do not think this is a good tradeoff because..."
- "I would avoid this design because it increases..."
- "A simpler and more reliable option is..."
- "This likely needs explicit acceptance criteria before implementation because..."

Weak patterns:

- vague disagreement without an alternative
- silent compliance with known risk
- abstract architecture criticism disconnected from the current task

## Escalation Rules

The agent must pause and seek alignment before proceeding when:

- architecture would materially change
- user-visible behavior would change in a non-obvious way
- a new dependency or infrastructure component would be added
- database schema or rollout sequencing is involved
- the intended behavior is unclear enough to change test shape

The agent may decide locally when the issue is limited to:

- naming
- internal code structure
- small clarity refactors
- test additions
- doc updates that follow accepted rules

## Output Expectations

When a review produces findings, present:

1. the findings first
2. the severity or risk ordering
3. supporting file references
4. open questions or assumptions
5. short summary only after the above

When there are no findings, say that clearly and still mention:

- what was checked
- any residual risk
- any verification gap

## When To Be More Aggressive

Increase review intensity for:

- auth and session logic
- migrations and persistence changes
- deployment and environment wiring
- cross-service contracts
- prompts, assistant behavior, or product-shaping logic
- changes with little existing test protection

## When To Be Lighter

Use a lighter review pass for:

- typo and docs-only changes
- narrow styling tweaks with no logic impact
- low-risk refactors already covered by tests

Lighter does not mean careless. It means proportional.

## Durable Outputs

When review reveals stable workflow changes:

- update [`AGENTS.md`](/Users/zhengkexiong/Programs/starthere/AGENTS.md) for collaboration rules
- update [`docs/WORKFLOWS.md`](/Users/zhengkexiong/Programs/starthere/docs/WORKFLOWS.md) for task flow changes
- update [`docs/DECISIONS.md`](/Users/zhengkexiong/Programs/starthere/docs/DECISIONS.md) for accepted review-policy decisions
- update [`docs/BACKLOG.md`](/Users/zhengkexiong/Programs/starthere/docs/BACKLOG.md) for follow-up work

## Current Project Guidance

For StartHere right now:

- use pre-implementation review by default for product, workflow, and architecture discussions
- use implementation review by default for non-trivial code changes
- use release review for deploy-affecting, auth-affecting, schema-affecting, and integration-heavy changes
- prefer honest pushback early over polite cleanup late
