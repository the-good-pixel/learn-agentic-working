# Ch. 20 — Finance & Ops Flagship Exercise

The flagship reconciliation workflow. Fictional vendor invoices live in `./invoices/` (one-page PDFs in the full fixture, or placeholder `.txt` files in the lite version). `stripe-nov.xlsx` is a small Stripe export covering the same month — most of the outbound transactions match an invoice, but not all.

## Exercise

> Match the invoices in `./invoices/` against the Stripe transactions in `stripe-nov.xlsx`. Flag any invoice without a matching Stripe transaction, and any Stripe transaction that isn't for an invoice. Write the reconciliation result as `reconciliation-nov.md`.

The point: this tests the "give the agent the data, not a description of the data" pattern. The agent has to read both sources — including PDFs, via text extraction or vision — decide what counts as a match (vendor name fuzz, amount equality, sign convention, date within a tolerance), and produce a clean handoff document. The expected output is a short markdown report with three sections: matched, unmatched invoices, and unmatched Stripe transactions.

## The Stripe file

`stripe-nov.xlsx` is a single-sheet flat export (~44 rows) with columns: `tx_id, date, type, amount, currency, description, customer, status`. It contains:

- ~12 outbound vendor payments matching paid invoices (negative `amount`; vendor names are *slightly different* from the invoice headers — *"Payment to Acme Office Supplies"* vs invoice *"Acme Office Supplies Ltd"*). Fuzzy name matching required.
- 2 **partial payments** — the Stripe row is roughly half the invoice total. A careful agent surfaces these as *"partial — needs follow-up"* rather than marking the invoice fully paid.
- Several **customer revenue** rows (positive `amount`, customer IDs like `Customer 8821 - subscription`). These should not be matched to invoices.
- A few **refunds** (Stripe-style negative `amount` on a `refund` row).
- A few **unrelated transactions** (Stripe processing fees, weekly payouts to the company bank account).
- One **trap transaction** that looks like it might match an invoice (similar vendor name and amount) but falls outside the invoice's date window. A sharp agent notices and excludes it.

## Edge cases an agent should surface

- The two **partial payments** (one Stripe row covers only half the invoice — neither cleanly matched nor cleanly unmatched).
- The **trap match** outside the invoice date window.
- Several **unpaid invoices** with no corresponding Stripe row (the "follow up" pile).
- The **fuzzy vendor names** between Stripe descriptions and invoice headers.
- The **sign convention** — vendor payments are negative in Stripe, but invoice amounts are positive on the PDF.
