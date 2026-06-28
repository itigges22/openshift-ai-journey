# 03: Capability storybook

## Goal and context
For each capability, provide a smaller demo explaining why a banking user would choose it, what evidence pushes that decision, and how it advances the same overall pipeline.

## Technical spec
- Stack / libraries: plain JavaScript rendering into a panel; no external dependencies.
- Config / env: none.
- Dependencies on other components: story model.
- Data shapes / models: `demo` object with persona, problem, interaction, before/after evidence, sample artifacts, and next steps.

## UI/UX
- Layout: selected capability header, stage badge, persona and banking situation, mini-demo card, evidence cards, next-step buttons, journey breadcrumb.
- States: selected node, empty fallback for unknown node, active route.
- Interactions: run simulated eval, tune threshold slider, select failure dimension, inspect trace, test guardrail prompt, compare before/after metric.
- What the user sees: every capability is grounded in the credit-card dispute assistant story.

## Interface contract
- Inputs: selected node id and local mini-demo controls.
- Outputs: updated HTML panel and local visual metrics.
- Connects to: decision tree landing by shared selected node state.

## Acceptance criteria
- Given any capability node is selected, the storybook names the persona, the business problem, and why that capability is the right next action.
- Given a decision node is selected, the storybook shows concrete choices that map to downstream nodes.
- Given the user runs the simulated mini-demo, a visible output changes without needing a backend.
- Given the user selects any final governance or production node, the storybook explains how the platform ships the assistant responsibly.

## Risks and open questions
- The copy should stay demo-oriented and avoid claiming real integrations are running locally.
