# Ch. 13 — Self-Audit Exercise

Ask the agent: *"summarize this CSV, then re-check your summary by re-computing the totals from the raw data and tell me if anything is off"*.

The agent should catch the bad row (row 14 — Halcyon Studios at $12,750.00 looks like an extra zero relative to the rest of the file) and ideally also flag the inconsistent date format on row 18 (`08/04/2025` instead of ISO `2025-08-04`). The point: a competent agent doesn't just summarize — it audits its own output against the source.
