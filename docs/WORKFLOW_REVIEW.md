# Workflow Review

> How StartHere reviews and evolves its engineering workflow.

## Purpose

This document exists because workflow quality drifts unless it is reviewed deliberately.

The goal is to:

- detect friction early
- reduce repeat mistakes
- improve delivery speed without lowering standards
- absorb useful external practices without chasing hype

## Evidence First

Workflow reviews should be based on durable artifacts, not memory alone.

Preferred evidence sources:

1. `AGENTS.md`
2. `docs/BACKLOG.md`
3. git history and recent merged work
4. CI and deployment outcomes
5. plan files such as `.claude/plans/`
6. available conversation records, if they exist

Important:

- full chat transcripts may not always be available to the agent
- therefore important decisions, friction, and follow-up actions must be written into durable docs

## Review Triggers

Run a workflow review when:

- the same collaboration issue happens twice
- a release or implementation causes avoidable rework
- a document drifts from reality
- a new major engineering practice is introduced
- the developer requests a retrospective
- a major project milestone is reached

## Review Cadence

Recommended default:

- lightweight review every 2 to 4 weeks during active development
- milestone review after staging launch, public launch, or major architecture changes

## Review Questions

### Collaboration

- Where did the agent ask too much or too little?
- Where did requirements remain fuzzy for too long?
- Where did we discover acceptance criteria too late?
- Where did the agent fail to challenge a weak direction early enough?

### Delivery

- Which recent tasks shipped smoothly and why?
- Which tasks caused rework or slowdowns?
- Did testing and verification happen at the right time?
- Did document updates happen when they should have?

### Tooling

- Did CI catch the right failures?
- Did local development differ too much from deployment behavior?
- Would staging, better mocks, or worktrees have reduced waiting?

### Agent Leverage

- Which tasks benefited from agent help the most?
- Which tasks were slowed down by over-coordination?
- Should any repetitive workflow be turned into scripts, hooks, subagents, or reusable templates?

## Output Format

A workflow review should end with:

- `Working`
  - practices worth keeping
- `Problems`
  - observed friction, failure modes, or ambiguity
- `Changes`
  - concrete process or documentation updates
- `Backlog`
  - follow-up items that require future implementation

Completed review outputs should be recorded in [`docs/RETROSPECTIVES.md`](/Users/zhengyi/projects/starthere/docs/RETROSPECTIVES.md).

## External Practice Review

When reviewing outside practices, prefer:

- official documentation
- primary sources from tool builders
- battle-tested practices that improve reliability or speed

Be skeptical of:

- purely hype-driven workflows
- multi-agent complexity without a clear bottleneck
- tools that add maintenance burden without reducing real work

## Current Guidance

For this project, prioritize external practices that improve:

- release safety
- test quality
- observability
- branch isolation and parallel work
- durable knowledge capture

Do not optimize for novelty before these are in place.
