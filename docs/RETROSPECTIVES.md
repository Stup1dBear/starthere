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

## 2026-03-17: Staging And Collaboration Review

- Scope:
  - Review the staging rollout conversation, the collaboration quality during environment setup, and which workflow improvements should become durable rules.
- Inputs:
  - This conversation's implementation work
  - Recent updates to deployment workflow and engineering docs
  - Staging rollout failures and fixes
- Working:
  - The collaboration stayed focused on real delivery rather than abstract process talk.
  - High-value decisions were written into durable docs instead of being left in chat only.
  - Staging was advanced from concept to working infrastructure with concrete repo and server changes.
  - The developer surfaced risks early instead of silently accepting weak defaults.
- Problems:
  - The agent initially missed that GitHub Actions UI was still using the old workflow because the new workflow had not been pushed or merged to `main`.
  - The agent initially gave environment configuration guidance that did not match the workflow implementation, which caused avoidable confusion about secrets versus variables.
  - The agent made a production-host Docker restart without flagging the operational impact strongly enough beforehand.
  - The conversation sometimes stayed too long in explanation mode before collapsing into a short executable checklist.
  - The developer sometimes asked broad infrastructure questions before locking the immediate next action, which increased context switching.
- Changes:
  - The workflow now uses `vars` for non-sensitive environment config and `secrets` only for sensitive values.
  - End-of-conversation review expectations were added to `AGENTS.md`.
  - This retrospective records that deployment/UI issues should be checked against git state earlier.
- Backlog:
  - Add a reusable end-of-conversation review skill for future sessions.
  - Continue tightening CI gates and migration safety after staging validation.
- Related:
  - [`AGENTS.md`](/Users/zhengyi/projects/starthere/AGENTS.md)
  - [`docs/STAGING_PLAN.md`](/Users/zhengyi/projects/starthere/docs/STAGING_PLAN.md)
  - [`docs/CICD_SETUP.md`](/Users/zhengyi/projects/starthere/docs/CICD_SETUP.md)

## 2026-03-18: Release Safety Closure Review

- Scope:
  - Review the work that closed the current release-safety phase: CI split, manual deploy control, explicit migrations, smoke tests, local setup hardening, and the first repository quality scan pass.
- Inputs:
  - Repository changes made in this conversation
  - Current workflow and operations docs
  - Actual staging and production baseline execution results
  - The quality-scan findings from this conversation
- Working:
  - The project now has a much safer release path than before: CI is separate from deploy, staging and production deploys are explicit, and smoke checks are no longer ad hoc.
  - Migration handling moved from implicit startup behavior toward explicit execution, which is a meaningful reliability improvement.
  - The developer consistently surfaced operational concerns early, especially around secrets, staging safety, and database access shape.
  - Durable docs were updated alongside implementation rather than left as chat-only knowledge.
- Problems:
  - The agent twice reported workflow changes as effectively pushed before verifying that `origin/main` had actually advanced, which created avoidable confusion in the GitHub Actions UI.
  - The agent initially implemented a custom migration baseline path that did not behave consistently with `golang-migrate`'s own version handling, and this had to be corrected after real DB verification.
  - The agent let important doc drift remain visible for too long, especially around staging flow and older environment assumptions.
  - The developer and agent both tolerated too many workflow changes landing before one clean end-to-end verification pass, which increased debugging surface area.
- Changes:
  - CI and deploy are now split into separate workflows.
  - Staging and production databases were baselined to migration version 1.
  - CORS moved from wildcard configuration to an explicit origin allowlist.
  - A recurring repository quality scan TODO was added to the backlog.
- Backlog:
  - Finish the targeted repository quality pass.
  - Standardize production smoke tests further.
  - Clean up stale process docs such as the remaining outdated staging plan details.
- Related:
  - [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md)
  - [`docs/CICD_SETUP.md`](/Users/zhengyi/projects/starthere/docs/CICD_SETUP.md)
  - [`docs/ENGINEERING_OPERATIONS.md`](/Users/zhengyi/projects/starthere/docs/ENGINEERING_OPERATIONS.md)
