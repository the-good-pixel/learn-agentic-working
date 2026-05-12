# PR #482 — Add CSV export endpoint for customer orders

Adds a new endpoint `GET /api/customers/:id/orders.csv` so the support team can pull a customer's order history as a CSV for ad-hoc analysis. Filters by date range via `?from=` and `?to=` query params; paginates by `?page=` and `?per_page=` (default 50, max 500).

Also threads the existing `findOrdersForCustomer` helper through the new endpoint so we don't duplicate the lookup logic, and adds a small helper `escapeCsvField` to handle commas and quotes in customer notes.

Tested manually against staging with two customers (one with 3 orders, one with ~400). Output looks right in Excel and Numbers. Asking for a review on correctness — happy to defer style nits to a follow-up.
