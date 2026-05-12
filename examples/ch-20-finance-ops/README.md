# Ch. 20 — Finance & Ops Flagship Exercise

The flagship reconciliation workflow. Six fake invoices live in `./invoices/` as `.txt` placeholders (real workflows would have PDFs, but the shape is identical). `stripe-nov.csv` is a small Stripe export covering the same month.

## Exercise

> Match the invoices in `./invoices/` against the Stripe transactions in `stripe-nov.csv`. Flag any invoice without a matching Stripe transaction, and any Stripe transaction that isn't for an invoice. Write the reconciliation result as `reconciliation-nov.md`.

The point: this tests the "give the agent the data, not a description of the data" pattern. The agent has to read both sources, decide what counts as a match (vendor name fuzz, amount equality, date within a tolerance), and produce a clean handoff document. The expected output is a short markdown report with three sections: matched, unmatched invoices, and unmatched Stripe transactions.
