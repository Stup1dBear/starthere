# Parallel Development

> Rules for when and how this project should do parallel work without creating context debt.

## Purpose

This document defines how to run more than one task at a time safely.

It exists because parallel work can increase throughput, but unmanaged parallel work usually creates:

- dirty baselines
- merge confusion
- duplicated work
- stale worktrees
- unfinished cleanup

Parallel development is a workflow, not a Git feature.

`git worktree` is only one tool inside that workflow.

## Core Principle

Default to serial execution.

Use parallel development only when it creates real delivery value such as:

- one task is blocked and another can proceed independently
- two tasks touch different parts of the codebase
- risky work needs isolation from the main working directory
- review or validation is waiting and another task can move meanwhile

Do not use parallel work just because it feels more productive.

## Parallel Work Decision Rules

Use serial execution when:

- the task is small
- the work touches the same files or modules
- the next step depends on the previous result
- the change is still exploratory and not yet stable

Use parallel execution when:

- tasks are clearly independent
- ownership can be separated cleanly
- integration order is understood
- each task still has a small enough scope to validate independently

## Default Implementation Model

For this project, the preferred model is:

- normal work
  - use a short-lived branch in the main working directory
- true concurrent work
  - use a separate branch and, when useful, a separate `git worktree`

Do not make `worktree` the default for every task.

## Worktree Policy

Use a worktree only when there is a real need for isolation.

Good reasons:

- two active implementation tasks at the same time
- a risky refactor that should not contaminate current work
- a long-running review or validation loop while another task proceeds
- explicit multi-agent or multi-terminal parallel work

Weak reasons:

- habit
- curiosity
- "just in case"
- trying to avoid cleaning the current working directory

## Baseline Rules

New branches or worktrees must start from a clean and explicit baseline.

Allowed baselines:

- `main`
- an explicitly named integration branch, such as `integration/<topic>`

Not allowed:

- creating a new task from a dirty working tree
- creating a new task from a half-finished branch without saying so explicitly
- inheriting uncommitted changes accidentally

Before creating a parallel task, confirm:

- the source branch
- the source commit
- whether the current working directory is clean

## Worktree Creation Rules

Each worktree should map to one clear task only.

For every new worktree, record:

- task name
- branch name
- path
- baseline branch
- baseline commit
- owner
- status

Recommended status values:

- `active`
- `blocked`
- `ready_for_merge`
- `merged`
- `abandoned`
- `stale`

If there is no clear task to write down, do not create the worktree.

## Active Work Tracking

Track active parallel work in a durable place.

Recommended file:

- `docs/ACTIVE_WORK.md`

At minimum, the tracking entry should show:

- what the task is
- where it lives
- what branch it uses
- what it depends on
- whether it is safe to continue, merge, or delete

This prevents losing track of long-lived or abandoned worktrees.

Use [`docs/ACTIVE_WORK.md`](/Users/zhengkexiong/Programs/starthere/docs/ACTIVE_WORK.md) as the default tracker unless a future workflow deliberately replaces it.

## Quantity Limits

For a single-developer project, keep parallel work small.

Recommended limits:

- `1` active main working directory task
- `0-2` active worktrees
- `3` total active implementation tracks as a practical maximum

If more than that seems necessary, the problem is usually:

- task slicing is weak
- priorities are unclear
- blocked work is not being closed out

## Ownership Rules

Each parallel task should have clear ownership.

That means:

- defined goal
- defined write scope
- defined validation scope
- defined merge target

Do not let two active tasks silently modify the same area unless one explicitly depends on the other.

## Integration Order

Before parallel work starts, identify how the tasks will come back together.

Common patterns:

- independent tasks merge directly to `main`
- one task depends on another and must merge second
- both tasks merge through a short-lived integration branch

When integration order is unclear, parallel work is premature.

## Multi-Agent Or Multi-Terminal Guidance

When multiple agents or terminals are involved:

- assign one task per branch or worktree
- do not let two agents own the same files without explicit coordination
- tell each agent its baseline, write scope, and expected output
- avoid using a sub-agent for blocking work that the main line needs immediately

Parallelism helps only when ownership is clean.

## Starting Checklist

Before starting parallel work, confirm:

- the task is worth parallelizing
- the baseline branch is explicit
- the baseline commit is known
- the current working directory is clean
- the write scope is separated
- the integration order is known
- the task has been recorded durably

## Ending Checklist

A parallel task is not done when code is merged.

It is done when:

- the work is merged or explicitly abandoned
- validation is recorded
- related docs are updated
- the tracking entry is updated
- the branch and worktree are cleaned up or intentionally retained with reason

Use [`docs/TASK_CLOSURE.md`](/Users/zhengkexiong/Programs/starthere/docs/TASK_CLOSURE.md) for the actual closure rules.

## Failure Modes To Watch

The most common parallel-work failures are:

- starting from a dirty baseline
- too many live worktrees
- vague task ownership
- hidden dependencies between "independent" tasks
- merging code without cleaning temporary artifacts
- forgetting to retire stale branches and worktrees

If these show up more than once, run a workflow review.

## Current Project Guidance

For StartHere right now:

- do not default to worktrees for ordinary work
- use worktrees only for true concurrent implementation tracks
- prefer clean baselines from `main`
- record active parallel work durably
- keep the number of active worktrees low
- require task closure after merge or abandonment
