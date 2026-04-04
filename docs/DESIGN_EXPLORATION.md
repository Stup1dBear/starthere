# Design Exploration

> Workflow for exploring visual and interaction direction before the project has a fully stable design system.

## Purpose

This document exists because StartHere does not yet have a finished visual language, but design decisions still need a reliable process.

Use it to answer:

- how visual directions should be explored
- how the developer and agent should talk about design without pretending certainty
- how to review visual experiments
- when a design idea is mature enough to become a stable rule

This document is not the final design system.

It is the harness for getting there.

## Core Principle

Do not force premature design certainty.

At this stage, the right question is usually not:

- "What is the final visual style?"

The better question is:

- "What experience are we trying to validate through this visual direction?"

The project should explore visual directions deliberately, then promote stable conclusions later.

## Why Visual Work Is Different

Visual design is harder to lock early because:

- important judgment often requires seeing, not just describing
- multiple visual directions may fit the product in theory but feel very different in practice
- LLMs can help structure exploration, but they are not the final visual judge
- over-specified design docs too early can freeze weak ideas into fake certainty

## Current Product Anchors

While the visual system is still evolving, these product truths already constrain design:

- the product should feel quiet, companion-like, and meaningful
- it should not collapse into generic productivity SaaS
- it should not become noisy, over-gamified, or pressure-heavy
- the current star should be visually important
- the assistant should feel present, but not theatrically dominant
- the wider sky should suggest continuity and context, not feed-like distraction

These anchors come from [`docs/PRODUCT_STRATEGY.md`](/Users/zhengkexiong/Programs/starthere/docs/PRODUCT_STRATEGY.md).

## What The Agent Should And Should Not Do

The agent should help by:

- turning vague feelings into a few clearer design directions
- naming the variable being explored
- identifying where a direction may drift away from product goals
- proposing review questions and tradeoffs
- comparing options after a visual experiment exists

The agent should not:

- pretend a final visual language can be fully derived from text alone
- overstate confidence about purely visual success
- lock the team into strong visual rules before enough experiments exist
- confuse polished verbal description with strong design

## Exploration Unit

A design exploration round should usually test one main variable.

Examples:

- homepage should emphasize one current star vs a broader star map
- the assistant should feel more like a companion panel vs a conversational canvas
- the visual tone should lean more observatory vs more poetic star diary
- check-in should feel more like speaking vs more like structured reflection

Avoid changing too many core variables at once.

If too many variables move together, it becomes hard to learn what actually worked.

## Exploration Workflow

Use this flow for each visual exploration round:

1. Define the experience question.
2. Define what variable is being tested.
3. Narrow to two or three plausible directions.
4. Create or inspect visual candidates.
5. Review them against product anchors.
6. Decide:
   - keep exploring
   - tentatively prefer one direction
   - reject one direction
   - promote a stable conclusion into a durable design rule later

## What To Define Before Exploring

Before starting a visual round, answer:

- what screen or flow is being explored
- what user feeling or behavior matters here
- what variable is being tested
- what should stay fixed during this round
- what would count as a useful learning outcome

## Good Exploration Questions

Good questions are concrete and comparative.

Examples:

- does this homepage make the current star feel central enough
- does this direction feel like companionship rather than management
- is this design too product-dashboard-like
- does this visual language make returning after drift feel inviting or burdensome
- does the assistant presence feel grounded or gimmicky

Weak questions:

- is this pretty
- is this cool
- does this feel modern

Those are too vague to guide real iteration.

## Review Questions

Every serious visual experiment should be reviewed with questions like:

- does the current star stand out as the main subject
- does the page feel more like exploration companionship than task management
- does the assistant feel integrated into the experience rather than bolted on
- is the design too noisy, too empty, or too generic
- does the screen invite return, or only first-glance admiration
- does the direction feel specific to StartHere, or could it belong to any SaaS product
- what emotional tone does the design create in the first five seconds

## Evaluation Sources

Use multiple kinds of evidence when possible:

- direct visual inspection
- side-by-side comparison
- product-principle fit
- implementation feasibility
- future extensibility across related screens

If a direction is visually interesting but hard to extend coherently, say so explicitly.

## Role Of Prototypes

The preferred way to evaluate visual ideas is through something visible:

- a coded screen
- a mock
- a component-level experiment
- a Figma exploration

Pure text discussion is useful for framing, but should not be treated as final validation.

## When A Direction Is Ready To Stabilize

Promote a visual conclusion into a stable rule only when:

- it survives at least one comparison against alternatives
- it aligns with product anchors
- it works on the relevant core screen, not just in isolation
- it feels extendable rather than one-off
- the developer and agent can describe why it works in concrete terms

At that point, the stable part may later move into a future `docs/DESIGN_STYLE.md`.

## Durable Record

Each exploration round should be recorded in [`docs/DESIGN_DECISION_LOG.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_DECISION_LOG.md).

That log should capture:

- what was explored
- which directions were compared
- what felt promising
- what was rejected
- what still needs validation

## Current Project Guidance

For StartHere right now:

- prioritize homepage, current-star focus, assistant presence, and check-in experience
- avoid trying to define a full mature design language before those core flows feel right
- favor comparative exploration over isolated moodboard talk
- use product fit and returnability as stronger criteria than novelty alone
