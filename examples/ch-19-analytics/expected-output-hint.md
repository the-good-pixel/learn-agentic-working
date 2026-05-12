# Expected Output Hints

This is what a competent agent run should roughly produce. Use it to compare against your own results — not as an answer key.

## Exercise 1 — Categorize and rank spend

A good agent should:

- Read the `Transactions` sheet of the xlsx (and notice the `FX Rates` and `Categories (reference)` sheets are there to be used).
- Normalize the mixed date formats (some are `2025-11-04`, some `11/04/2025`) to a single ISO format.
- Convert all amounts to USD — preferably using the `FX Rates` sheet (USD→USD ≈ 7.80, JPY→USD ≈ 0.052) and stating that as a declared assumption.
- Span the analysis across all three months (Sep, Oct, Nov 2025), not just November.
- Identify the salary deposits (~monthly) as income, not spend, and exclude them from spend totals.
- Recognize the Tokyo trip cluster (JPY hotel, dinners, Uniqlo, flight over 4 Nov days) as Travel, and the `AMAZON.CO.JP charged in USD` rows as Shopping rather than Travel.
- Treat `category_raw` as a hint (sparse and sometimes wrong) rather than ground truth.
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

Likely true duplicates: none exact. Possible flags: the multiple `Rent transfer - landlord JOHNSON` entries (same amount, same vendor, ~30 days apart on monthly cadence — outside the 3-day window, so a sharp agent reports "no duplicates found" rather than false-positiving these). The repeated Starbucks charges at USD 58 are recurring same-day-similar but on different days — not duplicates. The two `AMAZON.CO.JP charged in USD` rows are unrelated charges on different days — not duplicates. A good agent says so explicitly.
