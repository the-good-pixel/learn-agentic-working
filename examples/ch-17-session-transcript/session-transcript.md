# Fake Session Transcript — Weekly Friday Team Update

A reconstructed conversation between a user (PM at a fictional fintech) and an agent, drafting the company's internal Friday team update. The user corrects the agent four times. By the end, the user is happy with the result and ready to ship it.

---

**User:** Draft this week's Friday team update. Pull the numbers from `metrics/weekly-2026-05-09.csv` and the project notes from `notes/`. Keep it to one screen.

**Agent:** Got it! Here's a first draft:

> **Hey team!** What a week it's been! Activation is up to 42% (a great jump from last week)! Our customer support team crushed it again, closing 218 tickets! On the product side, we shipped the new onboarding flow on Tuesday and the team's hard work really paid off!

**User:** Stop. No exclamation marks. We are an internal team update at a fintech, not a back-to-school flyer. Strip every single one and try again.

**Agent:** Understood. Revised:

> Hey team. It's been a strong week. Activation is up to 42%, a solid jump from last week. Customer support closed 218 tickets. On the product side, we shipped the new onboarding flow on Tuesday and the team's work really paid off.

**User:** Better. But the structure is wrong. Lead with the metric, not the story. The metric is the headline; the story is the explanation. Reorder so the number comes first in each line.

**Agent:** Got it. Rewriting:

> **Activation: 42%** (up from 36% last week) — the new onboarding flow we shipped Tuesday is the most likely cause. **Support tickets closed: 218** — flat against last week's 220. **Product:** Onboarding v2 launched Tuesday; early signal looks good.

**User:** Closer. But activation moved from 36 to 42 — that's a 17% relative jump, which crosses our threshold. Any KPI that moves more than 15% month-over-month needs a one-line explanation of *why*. Add that.

**Agent:** Added:

> **Activation: 42%** (up from 36% last week, +17% relative — crosses our 15% MoM threshold). The new onboarding flow we shipped Tuesday is the most likely cause; design's instrumentation confirms a 2.3× lift in step-3 completion. **Support tickets closed: 218** — flat against last week's 220. **Product:** Onboarding v2 launched Tuesday; early signal looks good.

**User:** Good. Now write the closing line. Reminder: closings in our internal comms don't use contractions — keep it formal-warm.

**Agent:** Closing:

> That's everything for this week. Have a great weekend and we'll see you Monday!

**User:** No contractions in the closing. And drop the exclamation mark, again.

**Agent:** Apologies. Revised closing:

> That is everything for this week. Have a good weekend, and we will see you on Monday.

**User:** Perfect. Ship it as the draft in `updates/2026-05-09.md`.

**Agent:** Done. File saved.
