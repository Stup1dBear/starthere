# Task Closure

> Rules for finishing work cleanly so temporary artifacts do not become permanent project debt.

## Purpose

This document defines what "done" means after implementation exists.

It exists because unfinished cleanup creates long-term drag:

- bloated code
- temporary comments left behind
- stale docs
- one-off scripts with no owner
- stale branches and worktrees
- unclear validation history

Task closure is part of delivery, not optional polish.

## Core Principle

A task is not complete when the main code change exists.

A task is complete when:

- the implementation is intentionally shaped
- temporary artifacts are removed or promoted properly
- validation is recorded
- docs and follow-up items are updated
- the working state is cleaned up

## Closure Categories

Every non-trivial task should close out these categories:

1. code
2. docs
3. verification
4. workspace

## Code Closure

Before calling implementation done, check:

- temporary scaffolding is removed
- obvious duplication introduced during iteration is reduced
- explanatory comments are still necessary and accurate
- dead code, debug paths, and abandoned experiments are deleted
- naming and file placement still match the project structure

Do not keep temporary code just because it was useful during exploration.

## Comment Rule

Comments should survive only when they explain non-obvious intent.

Delete comments that are:

- only there to help the agent think
- restating obvious code
- describing an approach that is no longer true
- compensating for code that should be simplified instead

## Temporary Artifact Rule

For each temporary artifact, make an explicit decision:

- delete it
- promote it into a maintained project asset
- convert it into a documented follow-up item

Examples of artifacts that should usually be deleted:

- ad hoc debug code
- temporary migration helpers used only once
- throwaway shell scripts for one local run
- extra logging added only for diagnosis
- exploratory compatibility paths that are no longer needed

Examples that may be promoted if they are genuinely useful:

- reusable smoke or verification scripts
- stable operational helpers
- fixtures with ongoing test value
- checklists with repeat use

Promotion requires:

- a real file location
- a clear name
- clear ongoing purpose
- alignment with project structure

## Documentation Closure

Before closing a task, ask:

- did the behavior change
- did the workflow change
- did an accepted decision change
- did a source-of-truth doc become outdated

Then update the right document instead of leaving the answer in chat only.

Typical mappings:

- workflow changes -> [`docs/WORKFLOWS.md`](/Users/zhengkexiong/Programs/starthere/docs/WORKFLOWS.md)
- review policy changes -> [`docs/AGENT_REVIEW.md`](/Users/zhengkexiong/Programs/starthere/docs/AGENT_REVIEW.md)
- accepted decisions -> [`docs/DECISIONS.md`](/Users/zhengkexiong/Programs/starthere/docs/DECISIONS.md)
- follow-up work -> [`docs/BACKLOG.md`](/Users/zhengkexiong/Programs/starthere/docs/BACKLOG.md)
- testing rules -> [`docs/TESTING.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING.md)
- operational rules -> [`docs/ENGINEERING_OPERATIONS.md`](/Users/zhengkexiong/Programs/starthere/docs/ENGINEERING_OPERATIONS.md)

## Verification Closure

Before a task is done, record:

- what was verified
- which commands or checks were run
- what manual checks were performed
- what was not verified
- what residual risk remains

Do not report confidence that was not actually earned.

## Workspace Closure

Before closing a task, check the working state:

- is the branch still needed
- is the worktree still needed
- are there leftover local files created only for the task
- does the task tracker entry still reflect reality

After merge or abandonment:

- update task status
- delete no-longer-needed worktrees
- delete or archive no-longer-needed branches
- remove temporary local helpers that are not durable assets

## Worktree Closure

If a task used a worktree, closing the task should include:

- update its status in the active work tracker
- confirm merge or abandonment outcome
- confirm whether the branch should remain
- remove the worktree if it no longer serves an active purpose

Do not keep merged worktrees around without an explicit reason.

## Retain Vs Delete Decision Rule

When unsure whether to keep something, ask:

1. will this still be used after this task
2. does it have a clear owner and location
3. does it fit the current architecture and standards
4. will it make the next session clearer rather than noisier

If the answer is mostly no, delete it or convert it into a follow-up item instead of keeping it.

## Closure Output

A good close-out should say:

- what changed
- what was verified
- what was intentionally cleaned up
- what was left as follow-up and where it was recorded
- what residual risk remains

## When Closure Is Especially Important

Be extra strict about closure for:

- migrations
- operational scripts
- release or deploy changes
- auth and session changes
- temporary compatibility layers
- broad refactors
- multi-branch or worktree-based tasks

## Current Project Guidance

For StartHere right now:

- prefer deleting temporary artifacts over keeping "maybe useful" clutter
- keep durable scripts only when they have clear repeated value
- clean up worktrees promptly after merge or abandonment
- treat stale docs as part of unfinished work, not someone else's future problem
