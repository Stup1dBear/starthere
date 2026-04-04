# Active Work

> Durable tracker for active branches, parallel tasks, and worktrees.

## Purpose

This file exists to keep active work visible across sessions.

Use it to answer:

- what work is currently active
- which branch or worktree owns it
- what baseline it started from
- whether it is blocked, ready to merge, stale, or safe to delete

This file should stay current and lightweight.

## Status Values

Use one of:

- `active`
- `blocked`
- `ready_for_merge`
- `merged`
- `abandoned`
- `stale`

## Update Rules

Update this file when:

- a parallel task starts
- a worktree is created
- a task becomes blocked or stale
- a task is ready to merge
- a task is merged or abandoned
- a worktree is removed

If a task no longer needs tracking, remove or archive its entry promptly instead of letting this file grow forever.

## Active Tasks

Use one entry per active task.

```md
## <task title>

- Status:
- Owner:
- Goal:
- Branch:
- Worktree Path:
- Baseline Branch:
- Baseline Commit:
- Depends On:
- Validation Plan:
- Next Action:
- Safe To Delete:
- Notes:
```

## Current Entries

No active parallel tasks are currently recorded.

When the first parallel track begins, replace this section with real entries.

## Cleanup Rule

This file is for active work, not history.

After a task is merged, abandoned, or deleted:

- remove the entry once the closure is complete
- if the task taught a lasting workflow lesson, record that in the right durable doc instead

Do not keep old entries here as a changelog.
