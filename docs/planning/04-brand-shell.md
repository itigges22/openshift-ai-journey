# 04: Red Hat brand shell

## Goal and context
Make the website feel Red Hat branded and credible while respecting logo usage. Use the actual Red Hat logo asset from Red Hat brand assets, not an AI-generated or hand-redrawn logo.

## Technical spec
- Stack / libraries: local SVG asset in `assets/`, CSS custom properties, system font fallbacks with Red Hat-like weight and spacing.
- Config / env: none.
- Dependencies on other components: all visual components use shared CSS tokens.
- Data shapes / models: none.

## UI/UX
- Layout: black header with reverse Red Hat logo, red accent line, white and light-gray content areas.
- States: focus visible, hover visible, selected controls.
- Interactions: all clickable nodes and buttons have accessible labels and visible focus.
- What the user sees: official logo in the header, Red Hat red accents, black/white/gray foundation, green for the user's pillar, and restrained enterprise UI styling.

## Interface contract
- Inputs: static assets and CSS classes.
- Outputs: branded page shell and accessible component styling.
- Connects to: decision tree landing and storybook.

## Acceptance criteria
- Given the header renders, it uses `assets/red-hat-logo-on-dark.svg` or another fetched official Red Hat logo SVG.
- Given the logo is shown, it has clear space and is not recreated, recolored, warped, or generated.
- Given a user tabs through controls, focus state is visible.
- Given the page is viewed on desktop and mobile widths, content remains readable.

## Risks and open questions
- Official downloadable brand packages may require login. The locally fetched SVG should remain sourced from Red Hat-hosted brand assets.
