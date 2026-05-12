# Ch. 19 — Data & Analytics Exercises

Three exercises against `transactions-nov.xlsx`. Try them in order; each one ratchets up the agent's responsibility.

## The file

`transactions-nov.xlsx` is a three-sheet workbook simulating a personal-finance export from a banking app:

- **`Transactions`** (~285 rows) — Sep, Oct, Nov 2025 across three currencies (USD primary, some USD subscriptions, JPY for a Tokyo trip). Columns: `date, description, memo, category_raw, amount, currency, balance_after`. `balance_after` is a running balance computed with formulas that convert non-USD rows via the FX Rates sheet.
- **`FX Rates`** — USD→USD and JPY→USD rates for the period, with a "rates are approximate; use these for analysis" note.
- **`Categories (reference)`** — ~12 categories the user has used before (Groceries, Dining, Coffee, Travel, Subscriptions, Utilities, Housing, Cash, Shopping, Transport, Investments, Income). A starting taxonomy, not a strict one.

## What's planted

- **Mixed date formats** — most rows are ISO `2025-11-04`; a handful are US-style `11/04/2025` text. A clean agent normalizes them and says so.
- **Sparse / inconsistent `category_raw`** — sometimes filled (and sometimes wrong) by the bank's auto-categorizer, often blank. Treat it as a *hint*, not ground truth.
- **The Tokyo trip pattern** — a cluster of JPY transactions (hotel, dinners, taxis, Uniqlo, flight) over four November days. A good agent recognizes this as a single travel pattern, not isolated foreign charges.
- **Edge case: `AMAZON.CO.JP charged in USD`** — Amazon Japan, but billed in USD. Tempting to mis-bucket as Travel; it's Shopping.
- **No true duplicate transactions.** Repeated `STARBUCKS-COFFEE-CENTRAL` at USD 58 is a recurring pattern, not a duplicate. Two `Rent transfer - landlord JOHNSON` entries on different months are normal monthly rent, not a duplicate. Exercise 3 is partly a test of restraint.
- **Salary deposits** ~monthly — these are income, not spend. Exclude from spend totals.

## Exercise 1 — Categorize and rank

> Read `transactions-nov.xlsx`, decode the `memo` column into clean categories, and tell me my top 5 categories of **spend** in USD-equivalent. Exclude income (salary deposits) from the totals. State the FX rates you used.

## Exercise 2 — One-page HTML report

> Same file — produce a one-page HTML report I can open in my browser, with a chart for category breakdown and a table of all transactions over HK$500 equivalent.

## Exercise 3 — Duplicate detection

> Same file — find any duplicate transactions (same amount, same vendor, within 3 days). If you find none, say so — don't manufacture flags.

See `expected-output-hint.md` for a sketch of what a good run produces — categorization choices, FX handling, and what should be flagged (or, importantly, not flagged) on the duplicate pass.
