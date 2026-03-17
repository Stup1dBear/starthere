# Retrospectives

> Durable record of workflow and delivery retrospectives.

## How We Use This File

This file stores the outputs of completed retrospectives.

Use it for:

- workflow retrospectives
- milestone reviews
- release process reviews
- collaboration friction reviews

Do not use it for:

- open TODOs without conclusions
- active task plans
- speculative ideas that have not been reviewed

If a retrospective creates follow-up work, move those items into [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md).

If it changes a rule, update the correct source-of-truth document as well.

## Template

```md
## YYYY-MM-DD: Review Title

- Scope:
- Inputs:
- Working:
- Problems:
- Changes:
- Backlog:
- Related:
```

## 2026-03-15: Workflow Foundation Review

- Scope:
  - Initial pass to establish the project's agent collaboration, documentation, testing, environment, and delivery workflow foundations.
- Inputs:
  - Recent repository documentation work
  - Current CI/CD setup
  - Existing repo structure
  - Current local artifacts, including `.claude/plans/`
- Working:
  - Collaboration expectations are now much clearer than before.
  - Engineering delivery mode is explicitly preferred over tutorial-first behavior.
  - Testing, environments, backlog, and workflow review now each have a clear home in `docs/`.
- Problems:
  - Documentation previously drifted because process knowledge was spread across files and chat context.
  - The project still lacks a staging environment.
  - CI safety is incomplete because frontend validation is not yet a required deployment gate.
  - Full conversation transcripts are not reliably available as retrospective input.
- Changes:
  - Established source-of-truth document structure.
  - Added workflow review and learning queue process.
  - Added decision log and environment strategy.
- Backlog:
  - Build staging environment.
  - Complete CI gates before deploy.
  - Establish recurring workflow reviews in practice.
- Related:
  - [`AGENTS.md`](/Users/zhengyi/projects/starthere/AGENTS.md)
  - [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md)
  - [`docs/WORKFLOW_REVIEW.md`](/Users/zhengyi/projects/starthere/docs/WORKFLOW_REVIEW.md)
