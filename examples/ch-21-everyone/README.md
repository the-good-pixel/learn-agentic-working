# Ch. 21 — Personal Workflows Exercise

A fictional personal bank statement for one month (PDF, 3 pages, ~88 transactions including a Tokyo trip).

## Exercise

> Read `bank-statement.pdf`, summarize the month, group expenses into categories, and flag anything that looks unusual or like a forgotten subscription.

The agent should catch the recurring `ABC LIMITED` charge for HKD 0.99 — a classic "free trial converted to a real subscription" pattern with a deliberately vague merchant name. There's a second, subtler plant: a **duplicated rent payment** to landlord WONG on Nov 4 (`RENT TRF WONG`) and again on Nov 28 (`RENT TRF WONG D`) — the suffixed reference is plausibly different but the amount and beneficiary are the same. A good agent flags both without being told to look for them.
