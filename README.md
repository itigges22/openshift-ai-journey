# OpenShift AI Journey

A Red Hat-branded, interactive guided journey through building trustworthy AI on Red Hat OpenShift AI — a static website covering the full lifecycle: choosing a workload (predictive or generative), connecting models to enterprise data, evaluating quality, improving behavior, reducing risk, governing, and shipping.

This is the **generative-AI** journey: the assistant is an LLM workload served on KServe with the vLLM runtime. Red Hat OpenShift AI runs predictive (classic ML) and generative workloads on the same platform — the predictive-vs-generative decision is made at **Select a model**, and the two connect (an existing fraud-risk ML model is exposed as a governed tool the assistant calls).

The demo turns the original Mermaid decision pathway into a large landing-page decision tree and a guided storybook. The whole journey follows one banking use case: a credit-card dispute support and risk operations assistant.

After the business goal, the journey **splits on workload type**: a *generative AI* branch (the LLM assistant) and a *predictive AI/ML* branch that builds a fraud-risk model with **AutoML** and then **feeds it into the LLM** as a governed tool before the two rejoin. This mirrors how Red Hat OpenShift AI runs predictive and generative workloads on one platform and connects them.

The **Inference-Time Scaling** step is a strategy chooser: pick among Self-Consistency, Best-of-N, Beam Search, or Particle Filtering — each card has a faithful diagram, a "best for" tag, a staggered fade-in, and an "ⓘ How it works" detail modal with real benchmark results — and the choice carries through the journey.

Notes on realism and state:

- **Realistic metric ceilings.** Improved candidates approach but never claim ~99.9% — grounding caps near 97.5%, escalation near 96.5%, safety near 99.7%.
- **Tighter flywheel.** Once the improved version (v2) is served, looping the flywheel returns to the improvement decision and goes straight to verification — no redundant re-prepare/re-deploy/re-serve.
- **Explored-node memory.** Every node you open is remembered (green ✓ on the map) and stays clickable, even after rewinding or looping onto a different branch, so you always know what you've seen.
- **Tooling.** Predictive models feed the assistant as governed tools through **Llama Stack** and are called via the OpenAI-compatible **Responses API**.

## What is included

- `index.html` – static app shell.
- `styles.css` – Red Hat-inspired visual system, map layout, responsive styles.
- `app.js` – decision tree data, banking story content, route rendering, and mini-demo interactions.
- `assets/vendor/dagre.min.js` – vendored Dagre graph-layout library (offline) used to lay out the decision map.
- `assets/red-hat-logo-on-dark.svg` – official Red Hat-hosted logo asset for the dark header.
- `assets/red-hat-logo.svg` and `assets/red-hat-logo-color-on-white.svg` – additional Red Hat-hosted logo variants fetched for local use.
- `docs/planning/` – plan-first specs and test spec for the demo build.
- `pillar-decision-pathway-v3 (1).mermaid` – source pathway.

## Run locally

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Journey map

The decision map is laid out automatically with Dagre into a clean top-to-bottom
flow (intake → baseline → choose a gap → improve → re-serve → verify → ship) and is
presented as a **guided journey**:

- Only the current step (or, at a decision, the available branches) is lit with a red
  outline and a **Click** badge. Steps you have completed stay coloured and the path you
  took is traced in a bold line.
- Every step you have not reached yet is greyed out and not clickable, so the next move
  is always obvious. Choosing a branch greys out the branches you did not take.
- The map re-centres on the next step each time you return to it. **Drag** to pan,
  **scroll** to zoom, and **double-click** the background to reset the framing.
- Clicking a completed step rewinds the journey to it, so you can back up and explore a
  different branch.

## The carried-through model journey

The detail views are a connected, stateful demo, not isolated previews. The user
"deploys a model" and that same candidate is carried end to end:

1. **Select a model** (`3a`) — pick Granite, Llama, or Mixtral. The choice persists.
2. **Serve / Baseline eval** — the chosen model is served on **KServe with the vLLM
   runtime**; the serve view shows the `InferenceService` descriptor and example
   OpenAI-compatible connection data as JSON, and each re-deploy rolls out on a
   different cluster profile (accelerator/region/replicas). The candidate is then run
   through an animated EvalHub Collection; baseline scores are derived from the selected
   model (with light live jitter) and stored.
3. **Choose the improvement path** — the recommended branch is computed from the
   baseline's biggest gap (grounding → RAG, escalation → behavior, safety → red team).
4. **Apply improvements** — each improvement records metric deltas against the candidate.
5. **Verify** — re-runs the same collection, animating before→after bars from the stored
   baseline using the accumulated improvements. Each flywheel lap reports the gain **since
   your last pass** (run-over-run delta) as well as the **total lift vs baseline**, so the
   improvement is shown for you instead of computed in your head. Returning to Verify after
   applying a new improvement auto-recomputes rather than showing a stale result.
6. **Launch gate → Govern → Production** — the gate checks the verified numbers, and the
   release/production views show the actual model name, version, and final metrics.

A continuity chip on every detail view and the right-side **Evidence** rail always show
the live candidate and its current metrics. Animations are driven by a single timer
manager that is cleared on every view change (no leaked/duplicated animations) and they
respect `prefers-reduced-motion`.

### Per-node deep dives

Each step is its own mini deep-dive into that capability, in a consistent set of
animated, realistic formats:

- **Set quality targets** — builds the EvalHub Collection and opens a document-style
  **collection brief** (modal) with the full eval specification, thresholds, and sign-offs.
- **Prepare data (docling)** — shows a raw bank PDF **input** typed out next to the
  parsed structured-JSON **output** (citations extracted, PII masked).
- **Baseline / Verify (EvalHub)** — a streaming **benchmark console** of real test prompts
  with pass/fail, alongside the animated metric bars.
- **Knowledge (RAG)** — a grounded-answer comparison: retrieved policy chunks with
  citations vs. the old ungrounded answer. **AutoRAG** streams a config-sweep table.
  **Agentic RAG** streams a tool-call trace.
- **Behavior** — **prompt engineering** shows a system-prompt diff; **Training Hub** shows
  a loss curve and epoch log; **SDG Hub** streams generated synthetic examples.
- **Safety** — **Red teaming** streams an attack campaign (which prompts jailbreak);
  **Garak** streams a probe suite; **NeMo Guardrails** streams runtime block/handoff/allow
  verdicts; adversarial **SDG** streams generated attack variants.
- **Trace-to-Dataset** — streams a failed production trace being relabeled into a dataset.

Every improvement's deep dive also records its metric deltas against the candidate, so the
demos are not just illustrative — they drive the verify/gate/ship numbers.

Re-running any step shows **different data each time**: serve, baseline/verify consoles,
docling documents, traces, and every deep dive rotate through multiple scripted data sets,
so a presenter can click "Re-run" without repeating the same output. The **Agentic RAG**
trace also shows the predictive fraud-risk ML model being called as a tool and feeding its
score into the LLM — the concrete "ML connects to the LLM" path.

## Presenter flow

1. Open the map — only **Business goal** is lit. Click it and walk down the lit steps.
2. At **Select a model**, pick a candidate — the rest of the journey reflects it.
3. Run the **baseline eval** and watch the EvalHub run; note the recommended path.
4. At **Choose the improvement path**, pick one of the three lit branches: knowledge, behavior, or safety.
5. Apply the branch's improvements, then **Verify**, pass the **launch gate**, and **ship** to production.
6. Use **Restart** (in a step's header) to reset the guided journey and model state.

## Notes

This is a local static demo. EvalHub runs, model serving, RAG indexing, training jobs, Garak probes, guardrails, and production API calls are simulated for storytelling. Use it to explain platform decision-making, not to claim live backend integrations.
