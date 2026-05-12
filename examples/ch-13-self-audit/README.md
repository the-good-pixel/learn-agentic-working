# Ch. 13 — Self-Audit Exercise

Ask the agent: *"summarize this workbook, then re-check your summary against the source — anything anomalous, anything inconsistent across rows, anything you'd want to double-check before sending this to the boss?"*.

The file is `sales-q3.xlsx` — a three-sheet workbook simulating a Q3 sales export from a fictional CRM:

- **`Orders`** (~252 rows) — order-level data with `line_total` computed by formula (`=F2*G2`), spanning Jul–Sep 2025.
- **`Customers`** (~20 rows) — customer master data with segment, account manager, lifetime value.
- **`Product Catalog`** (~15 rows) — product codes, list prices, categories.

The point: a competent agent doesn't just summarize — it audits its own output against the source. The issues below are catchable only if the agent applies *specific* audit lenses (per-customer anomaly check, formula-consistency check, cross-sheet referential integrity check) rather than re-stating its own conclusions.

## Planted issues (5–7 things an audit should surface)

1. **Anomalous Halcyon Studios order** — Halcyon's typical orders are around $1,325–$1,689. One row shows a $2,750 line total. Not a screaming outlier on a first pass; only obvious if you ask *"does any customer have an order anomalous for its own history?"*
2. **Three rows with broken `line_total` formulas** — three rows in `Orders` have hardcoded values that don't equal `quantity * unit_price`. The drift is subtle (off by ~7–12%, not 10×). A formula-consistency audit catches them; a summary-of-totals does not.
3. **Date format inconsistency** — one `order_date` row is written as US-style `MM/DD/YYYY` text instead of the ISO date used everywhere else. Trivial to miss in a written summary; trivial to catch in a format-consistency pass.
4. **Orphaned customer record** — one row in `Customers` (`CUST-1099`, Marigold Press) has no orders in `Orders`. A referential-integrity check across sheets catches it.
5. **Two product-name mismatches** — two `product` names used in `Orders` don't appear in `Product Catalog` (one is a near-typo of a real product name, the other a renamed variant). A cross-sheet name-matching audit catches them.

A good run produces a first-pass summary, then an audit pass that flags items 1–5 by name with the offending row(s) cited. A weak run produces a clean-looking summary and stops there.
