# Ch. 13 — Self-Audit Exercise

Ask the agent: *"summarize this CSV, then re-check your summary against the source — anything anomalous, anything inconsistent across rows, anything you'd want to double-check before sending this to the boss?"*.

There are two planted issues, neither obvious from a first-pass summary:

1. **Row 14 — Halcyon Studios at $2,750.00 on 2025-07-25.** Halcyon's other orders in the file are $1,325.75 and $1,689.00. A $2,750 order isn't a screaming outlier (it would slot in as just a "big-ish order" in a fast scan), but it's roughly 2× Halcyon's typical order size. A self-audit that asks *"does any customer have an order that's anomalous for their own history?"* catches it; a quick first-pass summary won't.
2. **Row 18 — date `08/04/2025`** instead of ISO `2025-08-04` like every other row. Trivially easy to miss in a written summary; trivially easy to catch in a format-consistency audit pass.

The point: a competent agent doesn't just summarize — it audits its own output against the source. Both of these are catchable only if the agent applies a *specific* audit lens (per-customer anomaly check, format-consistency check) rather than re-stating its own conclusions.
