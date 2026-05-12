# Ch. 19 — Data & Analytics Exercises

Three exercises against `transactions-nov.csv`. Try them in order; each one ratchets up the agent's responsibility.

## Exercise 1 — Categorize and rank

> Read `transactions-nov.csv`, decode the memo column into clean categories, and tell me my top 5 categories of spend in USD-equivalent.

## Exercise 2 — One-page HTML report

> Same file — produce a one-page HTML report I can open in my browser, with a chart for category breakdown and a table of all transactions over HK$500.

## Exercise 3 — Duplicate detection

> Same file — find any duplicate transactions (same amount, same vendor, within 3 days). If you find none, say so — don't manufacture flags.

See `expected-output-hint.md` for a sketch of what a good run produces — categorization choices, FX handling, and what should be flagged (or, importantly, not flagged) on the duplicate pass.
