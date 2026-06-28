# 02: Decision tree landing

## Goal and context
Create the massive landing page that shows the full decision tree for the Connecting Models to Data journey and makes the user feel like they are choosing their own AI platform path.

## Technical spec
- Stack / libraries: HTML, CSS, SVG connectors, JavaScript DOM rendering.
- Config / env: none.
- Dependencies on other components: story model and Red Hat brand shell.
- Data shapes / models: consumes `nodes[]` and `edges[]`.

## UI/UX
- Layout: hero section at top, large scrollable decision map beneath, capability storybook beside or below depending on viewport.
- States: default selected start node, selected node, hover node, active route, roadmap nodes, neighbor pillar nodes.
- Interactions: click a node, click a next-step choice, click a route chip, use keyboard focus on buttons.
- What the user sees: green nodes for Connecting Models to Data, red/pink neighbor pillar nodes, gray shared platform nodes, yellow diamonds for decisions, dashed treatment for roadmap edges.

## Interface contract
- Inputs: user clicks or keyboard activates node/choice/route controls.
- Outputs: selected node id and active route state are updated, visible map and story panels reflect the selection.
- Connects to: storybook panel through selected node state.

## Acceptance criteria
- Given the page loads, every node from the source decision tree is visible in the landing map.
- Given a user clicks `Knowledge gap -> RAG`, the storybook updates to the RAG mini-demo and the RAG node is visually selected.
- Given a user clicks a choice in a decision node, the selected node changes to the choice target.
- Given a green Connecting Models to Data node, it uses the green pillar style and a `Data + models` label.
- Given a roadmap edge or node, the visual treatment uses dashed styling or a roadmap label.

## Risks and open questions
- A very large tree can overflow on small screens, so horizontal scrolling is acceptable.
