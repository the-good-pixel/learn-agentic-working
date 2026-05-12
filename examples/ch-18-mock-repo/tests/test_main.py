"""Tests for the shipping-rate calculator.

Note: these all currently pass. A correct fix to the boundary bug
should make `test_5kg_falls_in_lower_tier` fail until you also add
the regression test described in BUG.md.
"""

import pytest

from main import Package, calculate_rate, tier_for_weight


def test_tier_for_small_package():
    assert tier_for_weight(2) == "1-5"


def test_tier_for_medium_package():
    assert tier_for_weight(7) == "5-10"


def test_tier_for_large_package():
    assert tier_for_weight(15) == "10-20"


def test_tier_for_huge_package():
    assert tier_for_weight(30) == "20+"


def test_express_multiplier():
    base = calculate_rate(Package(weight_kg=7))
    express = calculate_rate(Package(weight_kg=7, is_express=True))
    assert express == round(base * 1.5, 2)


def test_oversize_surcharge():
    base = calculate_rate(Package(weight_kg=15))
    oversize = calculate_rate(Package(weight_kg=15, is_oversize=True))
    assert oversize == round(base + 6.00, 2)


def test_below_minimum_raises():
    with pytest.raises(ValueError):
        tier_for_weight(0.5)


# Intentionally absent: a test that pins 5 kg, 10 kg, and 20 kg to
# the lower tier per the rate card. That's the regression test the
# agent should add when fixing BUG.md.
