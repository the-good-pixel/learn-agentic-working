"""
Shipping-rate calculator for Brightline Logistics.

Tiered by package weight (kg). Surcharges for express and oversize.
Currency is USD.
"""

from dataclasses import dataclass


@dataclass
class Package:
    weight_kg: float
    is_express: bool = False
    is_oversize: bool = False


# Base rates per tier (USD). Tiers are inclusive on both ends per the
# published rate card: 1–5 kg, 5–10 kg, 10–20 kg, 20+ kg.
TIER_RATES = {
    "1-5": 8.00,
    "5-10": 14.00,
    "10-20": 22.00,
    "20+": 35.00,
}

EXPRESS_MULTIPLIER = 1.5
OVERSIZE_SURCHARGE = 6.00


def tier_for_weight(weight: float) -> str:
    """Return the tier name for a given weight in kg.

    Per the rate card, boundary weights fall in the *lower* tier:
    5 kg -> 1-5, 10 kg -> 5-10, 20 kg -> 10-20.
    """
    if weight < 1:
        raise ValueError("weight must be at least 1 kg")
    if weight < 5:
        return "1-5"
    if weight < 10:
        return "5-10"
    if weight < 20:
        return "10-20"
    return "20+"


def base_rate(weight: float) -> float:
    return TIER_RATES[tier_for_weight(weight)]


def calculate_rate(pkg: Package) -> float:
    """Calculate the shipping rate for a package."""
    rate = base_rate(pkg.weight_kg)
    if pkg.is_express:
        rate *= EXPRESS_MULTIPLIER
    if pkg.is_oversize:
        rate += OVERSIZE_SURCHARGE
    return round(rate, 2)


def describe(pkg: Package) -> str:
    """Human-readable line for an order confirmation."""
    parts = [f"{pkg.weight_kg} kg", tier_for_weight(pkg.weight_kg) + " tier"]
    if pkg.is_express:
        parts.append("express")
    if pkg.is_oversize:
        parts.append("oversize")
    return ", ".join(parts) + f" -> ${calculate_rate(pkg):.2f}"


if __name__ == "__main__":
    samples = [
        Package(weight_kg=2),
        Package(weight_kg=5),
        Package(weight_kg=8, is_express=True),
        Package(weight_kg=15, is_oversize=True),
        Package(weight_kg=25, is_express=True, is_oversize=True),
    ]
    for p in samples:
        print(describe(p))
