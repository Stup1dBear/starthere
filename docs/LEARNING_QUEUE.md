# Learning Queue

> High-value topics worth revisiting later, without polluting the active delivery backlog.

## How We Use This File

This file is for important ideas that should not be lost, but do not need immediate execution.

Use it for:

- external best practices to revisit later
- tools or workflows that may improve delivery
- ideas discovered during discussion that are worth digesting at the right time

Do not use it for:

- active engineering commitments
- already accepted decisions
- vague inspiration with no likely application

If an item becomes immediate work, move it into [`docs/BACKLOG.md`](/Users/zhengyi/projects/starthere/docs/BACKLOG.md).

## Status

- `inbox`
- `scheduled`
- `digested`
- `applied`
- `dropped`

## Template

```md
## Topic

- Status:
- Why it matters:
- Revisit when:
- Trigger:
- Source:
- Notes:
```

## Git Worktree For Parallel Development

- Status: inbox
- Why it matters:
  - Makes parallel feature work and multi-agent collaboration safer by isolating branches into separate working directories.
- Revisit when:
  - When staging or multi-branch parallel work begins.
- Trigger:
  - Need to work on more than one branch or agent task at the same time.
- Source:
  - Git official docs: https://git-scm.com/docs/git-worktree
- Notes:
  - Strong candidate for near-term workflow optimization after CI/staging basics are in place.

## Agent Hooks And Guardrails

- Status: inbox
- Why it matters:
  - Can automate policy enforcement, validation steps, and evidence capture instead of relying on memory.
- Revisit when:
  - After the core CI and staging workflow is stable.
- Trigger:
  - Repeated process failures, missed checks, or unsafe commands.
- Source:
  - Anthropic Claude Code hooks docs: https://docs.anthropic.com/en/docs/claude-code/hooks
- Notes:
  - Relevant even if the exact implementation differs across tools.

## MCP Tooling And Approval Boundaries

- Status: inbox
- Why it matters:
  - External tools can extend agent capabilities, but they need scope control, approvals, and auditability.
- Revisit when:
  - When current local tools become a bottleneck.
- Trigger:
  - Need reliable external docs, services, or automations inside the agent workflow.
- Source:
  - OpenAI remote MCP guide: https://platform.openai.com/docs/guides/tools-remote-mcp
  - MCP architecture: https://modelcontextprotocol.io/docs/learn/architecture
- Notes:
  - Favor a small approved tool set over broad uncontrolled access.

## Agent Tracing, Guardrails, And Handoffs

- Status: inbox
- Why it matters:
  - Strong agent systems need observability and clear boundaries, not just prompt quality.
- Revisit when:
  - When building more automation or multi-agent workflows.
- Trigger:
  - Need to debug agent behavior or separate planner/reviewer/executor roles.
- Source:
  - OpenAI Agents SDK docs: https://openai.github.io/openai-agents-python/
- Notes:
  - Useful mental model even if not directly adopted in this repository.

## Codex Harness Engineering Patterns

- Status: inbox
- Why it matters:
  - Provides directly relevant guidance on structuring repo knowledge and long-running agent workflows.
- Revisit when:
  - During future workflow reviews.
- Trigger:
  - Need to reduce documentation drift or improve agent effectiveness at larger scale.
- Source:
  - OpenAI harness engineering article: https://openai.com/index/harness-engineering/
- Notes:
  - Especially relevant: treat `AGENTS.md` as an index and keep `docs/` as the system of record.

## Recurring Review Habit

- Status: scheduled
- Why it matters:
  - High-value ideas are easy to lose if they never get revisited on purpose.
- Revisit when:
  - Every 2 to 4 weeks during active development.
- Trigger:
  - Workflow review or milestone review.
- Source:
  - Internal workflow decision
- Notes:
  - Review this file briefly during each workflow retrospective and either promote, defer, or drop items.

## Product Atmosphere References

- Status: inbox
- Why it matters:
  - StartHere now has a clearer emotional direction, and the next design work should be informed by works that already do quiet exploration, gentle companionship, and cosmic scale well.
- Revisit when:
  - Before major homepage, visual identity, assistant tone, sound, or social-presence design work.
- Trigger:
  - Need stronger inspiration for product mood, social subtlety, or the feeling of a larger sky beyond the user's own progress.
- Source:
  - Games: Outer Wilds, Journey, Sky: Children of the Light, In Other Waters, Heaven's Vault, Kind Words, A Short Hike, Citizen Sleeper
  - Literature: The Little Prince, Solaris, Stories of Your Life and Others, The Left Hand of Darkness
  - Film: Arrival, Interstellar, Her, Universe Exploration Editorial Department, Night on the Galactic Railroad
  - Music: Outer Wilds OST, Brian Eno - Apollo, C418 - Minecraft Volume Alpha/Beta, Max Richter, Olafur Arnalds, Nils Frahm, quieter Joe Hisaishi works
  - Visual art: The Starry Night, Caspar David Friedrich landscapes, Monet atmospheric works, Hilma af Klint
- Notes:
  - Use these as inspiration for tone and structure, not as assets to imitate directly.
  - Strongest current references for product feeling:
    - Outer Wilds for awe, quiet scale, and distant signals
    - Journey for light companionship
    - Kind Words for low-pressure social acknowledgement
    - In Other Waters for an honest AI companion
    - The Little Prince for the emotional meaning of stars
