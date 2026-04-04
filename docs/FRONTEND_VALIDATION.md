# Frontend Validation

> Evidence and decision rules for validating frontend work honestly, especially when visual quality matters.

## Purpose

Use this document to answer:

- what the agent can validate confidently for frontend changes
- what requires rendered evidence such as screenshots or live inspection
- what still requires human product judgment
- how frontend verification should be reported without overstating confidence

This document complements:

- [`docs/TESTING_PLAYBOOK.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING_PLAYBOOK.md)
  - practical test selection and execution
- [`docs/DESIGN_EXPLORATION.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_EXPLORATION.md)
  - how visual directions are explored before the design language is stable

## Core Principle

Frontend delivery should not claim more confidence than the evidence supports.

For StartHere, "the page renders" is not the same as "the product experience is good."

The agent may be able to verify functional correctness and obvious structural health.

The agent must not present visual quality or product-fit judgment as fully proven unless there is visible evidence and explicit human agreement when needed.

## Why Frontend Validation Needs Its Own Rules

Backend work is often validated through contracts, test results, and measurable behavior.

Frontend work has extra layers that are harder to prove through code alone:

- visual hierarchy
- emotional tone
- spacing and rhythm
- responsive composition
- whether the screen feels product-correct rather than merely complete

This repository needs explicit rules so the agent does not overclaim success after generating a page that only satisfies functional requirements.

## Validation Layers

Treat frontend validation as four separate layers.

### 1. Functional Validation

Questions:

- does the page load
- do interactions complete
- do requests and state transitions work
- do loading, empty, success, and error states behave correctly

Typical evidence:

- automated tests
- manual interaction
- console and network inspection

This is the layer the agent can usually validate most confidently.

### 2. Structural Validation

Questions:

- are the right regions present
- is the main path discoverable
- do obvious layout failures appear across key states
- does desktop or mobile layout obviously break

Typical evidence:

- rendered inspection
- responsive checks
- state-by-state review

The agent may validate this layer if it can inspect the rendered result directly.

### 3. Rendered Evidence Validation

Questions:

- do screenshots or live renders match the claimed layout and hierarchy
- is the current star visually central enough
- is the assistant integrated into the screen rather than bolted on
- are there obvious spacing, density, or contrast problems

Typical evidence:

- screenshots across relevant breakpoints
- side-by-side comparison
- visible prototype or running page

Without visible evidence, the agent should not speak confidently about this layer.

### 4. Product And Visual Judgment

Questions:

- does this feel like StartHere rather than generic productivity SaaS
- does the screen feel calm, companion-like, and meaningful
- is the visual direction too noisy, too theatrical, or too empty
- does the page support returnability and continuity

Typical evidence:

- screenshot review
- comparison against product anchors
- explicit human judgment

This layer requires human product judgment.

The agent can support this layer by framing tradeoffs and asking the right questions, but should not claim final certainty alone.

## What The Agent May And May Not Claim

The agent may claim:

- functional behavior passed the checks that were actually run
- obvious layout collapse was or was not observed in the states that were inspected
- screenshots were captured and what they appear to show
- residual visual uncertainty remains

The agent must not claim:

- that a screen is visually good based only on code review
- that a screen matches product tone based only on verbal intent
- that a design direction is successful without rendered evidence
- that a frontend task is "done" while visual quality is still unreviewed on a core screen

## Required Evidence By Change Type

### Frontend Logic Change

Usually requires:

- relevant automated checks
- manual interaction on the changed path
- note of any visible side effects if UI changed

### UI Structure Change

Usually requires:

- frontend automated checks as appropriate
- rendered verification on desktop
- rendered verification on mobile if the page is responsive
- confirmation that key states still read correctly

### Visual Or UX Change On A Core Screen

Usually requires:

- affected frontend automated checks as appropriate
- screenshots or visible render review
- explicit review against product anchors
- human signoff before claiming visual confidence

Core screens currently include:

- homepage
- current-star focus
- check-in flow
- assistant response surface

### Design Exploration Round

Usually requires:

- two or three visible candidates when comparison is the goal
- notes in [`docs/DESIGN_DECISION_LOG.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_DECISION_LOG.md)
- clear statement of what variable was being tested

## Screenshot And Render Expectations

Use screenshots or direct rendered inspection when:

- visual hierarchy changed
- spacing, density, or composition changed
- responsive behavior changed
- a core screen changed materially
- the task is being presented as a design improvement rather than only a logic change

Preferred minimum evidence for meaningful UI work:

- one desktop render
- one mobile-width render when the screen is responsive
- key state renders when empty, error, or loading behavior changed

If screenshots or direct rendered inspection were not available, say so explicitly and lower confidence accordingly.

## Human Review Boundary

Human review is required when:

- the task changes the visual direction of a core screen
- the task claims improvement in tone, feel, or brand fit
- the task introduces a new interaction pattern that changes how the experience is perceived
- the developer has already flagged visual quality as the main risk

Human review does not mean the agent failed.

It means the task crossed from implementation correctness into product judgment.

## Frontend Verification Report Format

For meaningful frontend work, report validation in this shape:

```md
Frontend Verification:

- Functional:
- Structural:
- Rendered Evidence:
- Human Review:
- Residual Risk:
```

Good example:

```md
Frontend Verification:

- Functional: submitted a check-in successfully and confirmed loading and error handling on the changed path.
- Structural: verified desktop and mobile layouts did not collapse in normal and empty states.
- Rendered Evidence: reviewed screenshots for desktop and mobile; current star remained visually primary, but assistant panel spacing still feels dense.
- Human Review: still needed for final visual judgment on homepage tone.
- Residual Risk: visual polish and product-fit confidence remain partial until human review.
```

Weak example:

```md
Frontend Verification:

- Looks good to me.
```

## Interaction With Other Docs

Use this document together with:

- [`docs/TESTING_PLAYBOOK.md`](/Users/zhengkexiong/Programs/starthere/docs/TESTING_PLAYBOOK.md)
  - to choose automated and manual checks
- [`docs/DESIGN_EXPLORATION.md`](/Users/zhengkexiong/Programs/starthere/docs/DESIGN_EXPLORATION.md)
  - when the task is testing a visual direction rather than only implementing an agreed screen
- [`docs/AGENT_REVIEW.md`](/Users/zhengkexiong/Programs/starthere/docs/AGENT_REVIEW.md)
  - when deciding whether visual confidence is strong enough to move forward

## Current Project Guidance

For StartHere right now:

- treat visual confidence as lower than functional confidence unless there is rendered evidence
- require explicit caution on homepage and assistant-loop UI claims
- prefer screenshot-backed discussion over text-only reassurance
- be honest when the agent can only say "functionally works" rather than "visually fits the product"
