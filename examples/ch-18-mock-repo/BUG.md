# BUG: 5kg package charged at the 5–10kg rate

**Reporter:** Customer support (forwarded from a customer complaint)
**Severity:** Medium — affects boundary-weight packages, ~3% of orders

## Summary

A customer who shipped a package weighing exactly 5.0 kg was charged $14.00 (the 5–10 kg tier rate) instead of $8.00 (the 1–5 kg tier rate). Per the published rate card, tier boundaries are inclusive at the lower end: 5 kg should fall in the 1–5 tier, 10 kg in the 5–10 tier, 20 kg in the 10–20 tier.

## Reproduction

```python
from main import Package, calculate_rate, tier_for_weight

tier_for_weight(5)        # returns '5-10', should return '1-5'
calculate_rate(Package(weight_kg=5))   # returns 14.00, should return 8.00
```

## Expected

- `tier_for_weight(5) == "1-5"`
- `tier_for_weight(10) == "5-10"`
- `tier_for_weight(20) == "10-20"`
- `calculate_rate(Package(weight_kg=5)) == 8.00`

## Notes

The docstring on `tier_for_weight` already states the intended behaviour ("boundary weights fall in the *lower* tier"), so the implementation drifted from the spec — this is a small fix (one operator change on each of the three tier-boundary lines: `5`, `10`, `20`) plus a regression test covering all three boundaries.
