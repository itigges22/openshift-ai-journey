# OpenShift AI Journey — Connecting Models to Data

A Red Hat-branded, interactive guided journey through building trustworthy AI on Red Hat OpenShift AI. One banking scenario carries the whole demo: **a credit-card dispute assistant**, taken from business goal to governed production.

The framing for the audience: in a regulated business, "the demo looked good" doesn't ship. The journey shows how the platform closes that gap — connect models to enterprise data, prove improvement with repeatable evals, reduce risk, and ship with governance.

## The journey (21 steps)

A guided decision map (laid out with Dagre) where only the next step is lit. The map opens zoomed in on the first step; the trackpad pans, and zoom is on the corner buttons only (the expand button shows the whole map).

The spine merges the plumbing (model selection and serving are one step) while the decision tree keeps its specifics:

1. **Business goal** - launch brief + workload choice (generative assistant and/or predictive fraud model)
2. **Predictive model** *(optional branch)* - AutoML (Tech Preview) builds a fraud scorer; Llama Stack exposes it as a tool the assistant calls
3. **Set quality targets** - EvalHub Collection with user-tunable thresholds
4. **Prepare enterprise data** - docling document conversion
5. **Pick a model & run the baseline** - AI hub catalog pick (Granite 4.1 8B / Llama 3.3 70B / Mistral Small 3.1 24B) serves to KServe + vLLM, then the baseline eval runs in the same step
6. **Choose the improvement path** - evidence routes to one of three branches:
   - **Knowledge**: Ground with RAG, then AutoRAG (TP) / Agentic RAG / Graph-SQL retrieval (industry pattern)
   - **Behavior**: Fix behavior decision, then inference-time scaling (its_hub strategy cards) / prompt engineering / create data & fine-tune (SDG Hub + Training Hub)
   - **Safety**: red team + adversarial data, then Garak probes (TP), then TrustyAI Guardrails Orchestrator
7. **Re-serve & verify** - v2 rolls out behind the same endpoint, the same collection re-runs, before/after animates
8. **Ready for production?** - launch gate with live threshold knobs; failing loops through **Trace-to-Dataset** back to the improvement decision (the flywheel)
9. **Govern & ship** - release bundle, then the production app calls the assistant via the OpenAI-compatible Responses API (Llama Stack)

The user's model choice is carried end to end (continuity chip + Evidence rail on every step). Re-running any step rotates through scripted data variants so a presenter never shows identical output twice.

## Technical accuracy notes

- EvalHub, Training Hub (SFT/OSFT), SDG Hub, its_hub, AI hub, llm-d, docling, Llama Stack Responses API — all real Red Hat / Red Hat AI Innovation Team names.
- AutoML, AutoRAG, and the Garak-based red-teaming harness are **Technology Preview** in OpenShift AI 3.4 and labeled as such.
- Runtime guardrails lead with the **TrustyAI Guardrails Orchestrator**; NeMo Guardrails is mentioned as an additionally supported option.
- Graph/SQL RAG is labeled an **industry pattern**, not a Red Hat roadmap item.
- Banking content follows Reg Z correctly: credit-card billing-error disputes are acknowledged within 30 days and resolved within two billing cycles (max 90 days); unauthorized-use liability is capped at $50 (§1026.12(b)). Provisional credit within 10 business days is a Reg E (debit/EFT) concept and is not claimed for credit cards.

## What is included

- `index.html` – static app shell (landing framing, journey map, detail views).
- `styles.css` – Red Hat-inspired visual system.
- `app.js` – journey data, banking story content, routing, and all interactive mini-demos.
- `assets/vendor/dagre.min.js` – vendored layout library (offline).
- `assets/*.svg` – Red Hat logo assets.
- `docs/planning/` – plan-first specs from the original build.
- `verify-demo.js` – Playwright smoke test (expects 21 nodes, guided journey, no console errors).

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Presenter flow

1. Landing page sets the scenario — read it aloud; it is the "why" of the demo.
2. Click through the lit steps. At **Select a model**, pick a candidate; everything downstream reflects it.
3. Run the **baseline**, take the recommended branch, apply an improvement.
4. **Re-serve & verify**, pass the **launch gate**, and ship — or fail the gate and show the flywheel via Trace-to-Dataset.
5. **Restart** (detail header) resets journey and model state.

## Notes

This is a local static demo. EvalHub runs, model serving, RAG indexing, training jobs, Garak probes, guardrails, and production API calls are simulated for storytelling. Use it to explain platform decision-making, not to claim live backend integrations.
