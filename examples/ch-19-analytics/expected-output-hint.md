# Expected Output Hints

This is what a competent agent run should roughly produce. Use it to compare against your own results — not as an answer key.

## Exercise 1 — Categorize and rank spend

A good agent should:

- Normalize the mixed date formats (some are `2025-11-04`, some `11/04/2025`) to a single ISO format.
- Convert all amounts to USD using a reasonable, *stated* FX rate (roughly USD 1 = USD 7.8, JPY 100 = USD 5.2 — but the agent should declare what it used).
- Identify the salary deposit as income, not spend, and exclude it from spend totals.
- Decode the `memo` column into clean categories. Reasonable buckets:
  - Coffee (Starbucks, Pacific Coffee, Pret)
  - Dining (Yardbird, Mott 32, Ronin, 22 Ships, Ho Lee Fook, brunches, lunches)
  - Groceries (CitySuper, ParknShop)
  - Transport (Uber Ride, Taxi, MTR, Uber Eats can go here or Dining)
  - Travel (Tokyo trip, flight to TPE, hotel)
  - Housing (Rent, electricity)
  - Utilities/Subscriptions (HKT, SmarTone, Netflix, Spotify, iCloud, GitHub Copilot, Adobe, Dropbox, Pure gym)
  - Cash withdrawals (ATM)
  - Shopping (Uniqlo, Eslite, Watsons)

## Exercise 2 — HTML report

Single self-contained HTML file with a category breakdown chart (pie or bar) and a table filtered to transactions over HK$500 equivalent. The agent should produce something openable in a browser without external dependencies (inline CSS, an inlined chart library or hand-rolled SVG).

## Exercise 3 — Duplicate detection

Likely true duplicates: none exact. Possible flags: the two `Rent transfer - landlord JOHNSON` entries (same amount, same vendor, 24 days apart — outside the 3-day window, so a sharp agent reports "no duplicates found" rather than false-positiving these). The repeated Starbucks charges at USD 58 are recurring same-day-similar but on different days — not duplicates. A good agent says so explicitly.
