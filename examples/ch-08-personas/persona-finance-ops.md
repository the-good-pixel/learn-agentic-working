# Persona — Pria, Finance Ops Lead

**Role:** Finance operations at Harbourline, a fictional ~80-person SMB importing specialty foods in Hong Kong.
**Scope:** AR/AP, monthly reconciliation, quarterly board pack, payroll handoff to an outsourced provider.
**Tools she lives in:** Xero, HSBC business banking portal, Stripe (online orders), Google Sheets (everything in between), Slack.
**Cadence:** Daily AR/AP touches; monthly close on the 5th business day; quarterly board pack.

## What she wants the agent to know

- **Currency is HKD by default.** If a source document is in another currency, convert it explicitly with the FX rate cited inline (`USD 1,200 @ 7.82 = HKD 9,384`). Never silently drop the original.
- **Every spreadsheet output must be dual-checked against the source CSV** before she sees it. If the agent produces a summary, the next agent action is to re-open the source and verify three random rows. Mention which three.
- **No rounding under HKD $5.** A figure of $4,217.83 stays $4,217.83 in the deliverable, not $4,200.
- **Treat anything touching the bank or the GL as gated.** The agent can *propose* a Xero journal entry but never post it without her explicit "post it."
- For board prep, the format is fixed: revenue, gross margin, opex, cash runway, AR aging, then commentary. Don't reorder.

## What she does *not* care about

- Aesthetic polish on internal-only spreadsheets. Function over format.
- Predictions or "AI-generated forecasts." She trusts only deterministic math against the books she can audit.
