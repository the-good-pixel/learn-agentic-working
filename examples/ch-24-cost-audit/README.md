# Ch. 24 — Cost Audit Exercise

A fictional one-month API billing export so you can practice the "find the most expensive workflow" exercise without exposing your real usage data.

`api-usage-nov.csv` has ~140 rows across five workflows:

- `weekly-investor-update` — 4 runs/month, ~$8/run (expensive but justified by cadence)
- `pricing-research` — 5 runs/month, ~$25/run (expensive *and* infrequent → cache-or-downshift candidate)
- `dogfood-qa-run` — nightly, ~$1.50/run (volume; downshift to small model is the obvious move)
- `quick-question-answers` — ~80 runs/month at $0.04 (small per-call, real total)
- `random-debug-prompts` — already on the small model; included as a control

## Exercise

> Read `api-usage-nov.csv`. Tell me my top 3 most expensive workflows for the month, and for each one say: could it downshift to a smaller model without losing quality, or could prompt caching cut the cost? Be specific — name the workflow and quantify the potential savings.

**You'll know it worked when** the agent names `pricing-research` and `dogfood-qa-run` as primary downshift candidates (and quantifies each in dollars), separates "high per-call" from "high total" workflows, and doesn't blanket-recommend "use a smaller model" without per-workflow reasoning.
