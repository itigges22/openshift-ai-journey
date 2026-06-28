# TEST_SPEC: Models to Data Decision Storybook

Derived from the acceptance criteria in the component plans. This is the source of truth for testing. Tests are written against this spec, not against implementation assumptions.

## How to use this spec
- Tests should exercise the public UI in a browser or by inspecting generated static files.
- The spec is ground truth: a failing test means the code is wrong until proven otherwise.
- A test is never weakened to make the build pass. If a behavior here turns out to be wrong, fix the spec and re-derive the affected tests.

## Unit behaviors (per component)

### 01: Story model
- Given each original Mermaid node id, expect one corresponding rendered node or selectable story item.
- Given a Connecting Models to Data node, expect the data pillar class and green visual treatment.
- Given a decision node, expect multiple visible choice buttons that select downstream nodes.

### 02: Decision tree landing
- Given the page loads, expect the full tree to be visible with connectors and a legend.
- Given a user selects RAG, expect the RAG node to become selected and the storybook to show RAG content.
- Given a route chip is selected, expect a path through the map to be visually emphasized.

### 03: Capability storybook
- Given any node is selected, expect persona, situation, decision rationale, evidence, and next step sections.
- Given the simulated demo button is clicked, expect the panel output or metric state to visibly change.
- Given a decision option is clicked, expect navigation to the target capability.

### 04: Red Hat brand shell
- Given the header renders, expect an official Red Hat SVG from `assets/` to appear on a dark background.
- Given keyboard navigation, expect visible focus on nodes, route chips, and decision buttons.

## End-to-end behaviors (user-visible flow)
- As a banking AI lead, when I start on the landing page and choose the knowledge gap route, I observe a path from baseline evaluation to RAG, re-serve, verify, threshold gate, governance, and production.
- As a platform engineer, when I select the safety route, I observe adversarial data, Garak probes, guardrails, re-serving, verification, and governance in a single story.
- As a demo presenter, when I click through all nodes, I can explain every capability without leaving the banking use case.

## Adversarial and edge cases
- Malformed input: selecting an unknown node id should fall back to the start node or show a safe empty message.
- Ordering / sequence: selecting a downstream node before an upstream node should still render the storybook.
- Concurrency: rapid clicks should leave one selected node and not duplicate panels.
- Empty / oversized input: long story text should wrap and not overflow the viewport.
