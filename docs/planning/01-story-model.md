# 01: Story model

## Goal and context
Provide a single source of truth for the banking story, decision tree nodes, edges, capability copy, mini-demo configuration, decision options, and simulated metrics. This prevents the landing page and the smaller demos from drifting apart.

## Technical spec
- Stack / libraries: plain JavaScript object exported in `app.js`.
- Config / env: no environment variables.
- Dependencies on other components: source content comes from `pillar-decision-pathway-v3 (1).mermaid`.
- Data shapes / models:
  - `nodes[]`: id, title, subtitle, type, pillar, stage, x, y, summary, demo, choices, metrics.
  - `edges[]`: from, to, label, optional dashed.
  - `routes`: named routes for knowledge, behavior, safety, performance, and governance journeys.

## Interface contract
- Inputs: none at runtime beyond local browser events.
- Outputs: arrays and maps consumed by render functions.
- Connects to: decision tree landing and capability storybook.

## Acceptance criteria
- Given a node id from the original Mermaid file, the story model contains one matching node with a banking-specific explanation.
- Given a decision node, the model contains at least two choices with clear business consequences where the original graph branches.
- Given a Connecting Models to Data capability, the node is marked as `pillar: data` so it renders green.
- Given a roadmap or neighbor capability, the node is visually distinguished from the green pillar nodes.

## Risks and open questions
- Product names may evolve. The demo should avoid implying that stubbed features are live product functionality.
- Some roadmap items should be marked as roadmap to avoid overstating availability.
