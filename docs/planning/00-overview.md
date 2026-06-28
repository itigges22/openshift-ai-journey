# Models to Data Decision Storybook: Overview

## Thesis
Red Hat OpenShift AI can guide a banking team from a high-level AI use case to a governed production assistant by turning every model failure into the next concrete data, evaluation, tuning, safety, or deployment decision.

## Audience
Technical product leaders, platform engineers, and AI engineers who understand model serving and RAG at a high level, but need to see how the Connecting Models to Data capabilities fit together across one coherent platform journey.

## The hook
A large Red Hat-branded landing page shows the full decision tree at once. Clicking any node opens a smaller storybook demo for that capability in the same banking use case: a customer support and risk operations assistant for credit-card disputes, policy questions, and fraud escalation.

## Constraints
- Hardware: local static web demo, no backend required.
- Stack: plain HTML, CSS, and JavaScript so it runs from any static server.
- Time / scope: build a polished website demo with mocked data, visible interactions, decision routing, and believable metrics.
- Real vs. stubbed: the UI, decision tree, navigation, story content, and mini-demo interactions are real. Model calls, eval runs, training jobs, RAG indexing, red-team scans, and deployment status are simulated with deterministic local data.

## Components
| #  | Component | Responsibility | Depends on |
|----|-----------|----------------|------------|
| 01 | Story model | Single source of truth for nodes, decisions, story stages, mini-demo content, and metrics | Original Mermaid decision tree |
| 02 | Decision tree landing | Render the full platform decision tree, highlight Connecting Models to Data nodes, and let users select paths | Story model, brand shell |
| 03 | Capability storybook | Show a focused banking demo for each capability with why, what decision, simulated evidence, and next step | Story model |
| 04 | Red Hat brand shell | Apply Red Hat visual language, official logo asset, colors, typography fallbacks, and accessible layout | Official Red Hat logo SVG |
| 05 | Spec-derived test checklist | Provide observable manual and automated checks for the static demo | Component plans |

## Data flow
1. The page loads the story model from local JavaScript.
2. The landing tree renders every node and edge from the decision pathway.
3. The default selected node is the banking use case start.
4. When a user clicks a node or a decision option, the app updates the selected capability, the journey timeline, the visible mini-demo panel, and the next-step buttons.
5. Mini-demo controls mutate only local UI state, such as a selected failure type, eval threshold, guardrail verdict, or trace sample.
6. The user can continue through one of several routes and still remain inside the same banking story.

## Build order
1. Story model, because every view consumes the same nodes and journey metadata.
2. Brand shell, because the tree and storybook need shared layout, colors, and logo treatment.
3. Decision tree landing, because it is the first visible hook and primary navigation.
4. Capability storybook, because it depends on selecting a node from the tree.
5. Test checklist, because it is derived from the completed plans and validates observable behavior.
