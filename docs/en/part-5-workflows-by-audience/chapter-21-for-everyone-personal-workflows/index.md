# 21. For Everyone (Personal Workflows)

*A note on how to read Part V.* Read only this chapter if its role matches yours — the other chapters in Part V exist as inspiration for what your colleagues in other roles are doing. The workflows below are real personal-workflow cases the rest of the playbook draws from. Pick one that sounds useful, drop the suggested files in front of your agent, and run it.

It's Sunday afternoon. Your Downloads folder has 1,400 files in it, the oldest from 2019. There's a bank statement on the kitchen table you've been meaning to read for two weeks because something doesn't quite add up. You bought a new router and have no idea where to put it in the apartment. Your mom asked you, again, what's happening with your investments. And you've been thinking — vaguely — that you'd like to learn how to use Blender, but every time you open it you bounce off.

None of this is work. None of it requires a meeting. All of it is exactly the shape that, until recently, you'd have just kept ignoring. This chapter is a tour of the personal-life workflows where having an agent on your machine turns "I should really…" into "okay, done."

You don't need a job title for any of this. You just need an agent installed.

## Taming the Downloads folder

The Downloads folder is the universal mess. It has receipts you might need, screenshots from two years ago, installers for software you no longer use, music you forgot you bought, and PDFs you saved "to read later" and never did.

Ask the agent:

> *"Go through `~/Downloads/`. Group the files by what they look like they are — invoices, screenshots, installers, music, documents, junk. Don't move anything yet. Show me the groups and tell me what you'd suggest doing with each."*

It comes back with a proposal: *"823 screenshots, mostly from 2022; 47 invoices from various vendors; 12 installers for software not currently on this machine; 211 PDFs; 14 video files; 293 'unclassified'."* It suggests moving the screenshots to a dated archive, deleting the old installers, sorting the invoices into a `Receipts/` folder by year, leaving the PDFs alone until you've decided.

You approve. It does the moves. You can undo if you don't like the result, because you watched what it did.

The version of this that's *good* doesn't run on autopilot. It proposes; you approve. Personal files are the kind of thing where the agent should always *show* before *do*. That's a one-line preference you give it once.

## Decoding a confusing bank statement

The classic personal-finance ask:

> *"My balance keeps dropping faster than I expect. Read every PDF in `~/Documents/bank-statements/2024/` (last three months). Tell me what's going on."*

You hand it the PDFs. The agent reads them — it can *see* PDFs directly, no scanning step required — and comes back with: *"You have four active subscriptions you may not be tracking. There's a duplicate charge from your phone provider in March. Your weekly grocery spend went up 22% in April. The single biggest hit was a one-time payment of $1,240 on May 3 to 'MISC' — do you want me to find which merchant?"*

You ask the follow-up. It finds the merchant. You realize you'd forgotten about an annual subscription that just renewed.

Two things make this work where a normal chatbot wouldn't:

- It can read the actual files. No retyping. No screenshotting.
- It will tell you when it's *not sure* about a number. Push back if it doesn't — *"don't fill in values you're guessing at; flag them."*

This is the moment that converts a lot of people. The first time the agent finds a real $200 mistake on your behalf, the relationship changes.

## Planning router placement from a photo

You have a new mesh WiFi system and three nodes. You have a floor plan, or you have a hand-drawn sketch, or you have a photo of the apartment from above.

> *"Here's `~/Desktop/apartment-floorplan.jpg`. We have three router nodes. Where should I put them? The router goes by the front door because that's where the cable comes in. We work from the office, watch TV in the living room, and the kids' rooms are at the back. Thick walls are this brick color."*

The agent looks at the image. It thinks about coverage. It proposes placements. It explains tradeoffs: *"node 2 in the hallway loses you some living-room signal but covers both kids' rooms; if the living room matters more, put it there instead and accept that the back bedroom will only get one bar."*

You're not asking it to fly drones. You're asking it to look at the picture and reason about a small, bounded problem. That it can *look at the picture* is the part that's new.

The same shape applies to a lot of small visual problems: *"is this electrical outlet wired right?"* (photo + question), *"is this plant dying?"* (photo + symptoms), *"what's wrong with this espresso shot?"* (photo + description). Vision turned the agent from a researcher into something more like a *neighbor with a camera and an opinion*.

## Learning a new tool by doing the homework alongside you

You want to learn Blender. The traditional path: a 6-hour YouTube playlist, half of which you don't watch.

The agent-era path:

> *"I want to learn Blender enough to make a simple animated logo for a hobby project. I have no experience with 3D tools at all. Build me a one-week plan saved as `~/Documents/blender-week/plan.md` with one small project per day, in increasing difficulty. For each day, give me the exact steps, with screenshots of where the buttons are if you can find them. After each day, I'll drop my result in `~/Documents/blender-week/dayN/` and you'll tell me what's wrong."*

What you get is a *tutor*, not a textbook. The plan is yours. The accountability is real (you have to show your result). The corrections are specific. The "what's wrong" feedback is the part most courses skip entirely.

This works for almost anything: a language, a musical instrument, knitting, photography, Excel pivot tables, basic cooking. The pattern is the same — small daily project, show your work, get corrections.

## The personal-investing terminal

If you invest, even casually, you've felt the gap between *what your broker app shows you* and *what you actually want to know*. Your broker shows you positions and prices. It doesn't tell you why a stock dropped 6% today, or how your three Asian stocks correlated last quarter, or what news broke for a ticker overnight while you were asleep.

The professionals pay for Bloomberg or Reuters to fill that gap. You can have a *much* cheaper version of it on your own machine.

The shape:

- The agent connects to your broker (live positions, P&L, margin) — you don't open the broker app to ask basic questions anymore.
- The agent pulls news for any ticker from multiple market-data sources at once — the specific providers don't matter to you (your agent picks them up from connectors you've installed once), what matters is you get one merged timeline instead of six tabs.
- The agent answers questions like *"what's my exposure to semiconductors right now?"*, *"what's correlated with my biggest position?"*, *"what news broke overnight that might move my portfolio?"*

This isn't financial advice. It's *information assembly*, which is the part you used to do by hand across six tabs. The actual decisions are still yours.

If you have multiple accounts in different markets (one US broker, one Hong Kong broker, one Japan account), the merging-across-accounts step is exactly the kind of plumbing that nobody else will do for you. The agent will.

A note on safety: read-only access to your broker is fine; *trading* access is the kind of *big and irreversible* action that deserves an approval gate (Ch. 7). Let the agent look. Make the trades yourself, or at least confirm each one.

## Making sense of bureaucracy

Insurance EOBs. Tax forms. School registration. Visa applications. Lease addenda. The bureaucratic paperwork of adult life is mostly *"read this dense document and tell me what it means for me"*.

- *"Read `~/Documents/insurance/2025-plan.pdf`. What's my actual out-of-pocket if I need an MRI? Compare against `~/Documents/insurance/2024-plan.pdf` and list the gotchas."*
- *"`~/Desktop/school-registration.pdf` is the school registration form. Walk me through what I have to fill in vs. what's optional vs. what I should skip."*
- *"Diff `~/Documents/lease/addendum-2024-nov.pdf` against `~/Documents/lease/original.pdf`. What changed? Is anything in here unusual?"*

You're not replacing a lawyer or an insurance broker. You're replacing the *initial confused read* — the half-hour you'd otherwise spend trying to understand the document before you can even formulate the question to ask the professional.

## Travel planning and trip prep

Travel is the easiest "obvious win" to demo. The agent handles the search, the synthesis, and the slightly-tedious comparison work — flights, hotels, neighborhoods, restaurants, things-to-do.

The version that gets *interesting* is the personal-context one:

> *"Plan three days in Tokyo for someone who's been twice before, doesn't want to do the famous things again, likes hole-in-the-wall jazz bars and weird museums, and is jet-lagged so wants the first day low-key. Save the itinerary as `~/Documents/trips/tokyo-2025-jan/itinerary.md`."*

A search engine can't answer that. A chatbot can suggest things, but you still have to do the actual booking dance. An agent can suggest, draft a tentative itinerary, and (if you let it) book the actual restaurants through whatever reservation system they use.

## The "what is this thing?" loop

This is the smallest workflow in the chapter and possibly the most-used one.

- *"My laptop is making this noise."* (audio file)
- *"This error showed up when I tried to print."* (screenshot)
- *"There's a weird charge on my card from a merchant I don't recognize."* (a name)
- *"This plant has these spots."* (photo)
- *"Why doesn't this link preview show up when I post on Threads?"* (a URL)

You used to Google it, click five results, and form your own conclusion. Now you ask, and you get a focused answer that takes your specifics into account. When the answer is *"I'm not sure — here are three possibilities; which one matches?"*, that's better than what Google was going to give you.

## When personal becomes worth a skill

If you find yourself making the same ask once a week — *"sort my Downloads folder again"*, *"summarize this week's bank statement"*, *"run my Monday-morning portfolio digest"* — that's the signal to capture it as a *skill*: a reusable workflow with a name, that the agent can invoke later from a one-word prompt. You don't write it; you finish the session, ask the agent *"write a skill that captures what we just did"*, and it drafts the whole thing from the conversation. Ch. 16 covers when to do this; Ch. 17 covers how.

A personal skill library forms surprisingly fast. After three or four months you'll have a small toolkit — your downloads-sorter, your statement-decoder, your portfolio-digest, your trip-planner-with-your-preferences-baked-in — that nobody else has. It's yours, written *by* the agent *from* your conversations, and it makes the agent feel like *your* assistant, not a generic one.

## The takeaway

- The personal-life version of the agent shines in *small, bounded, annoying* tasks — the things you'd never have paid software to do.
- Vision matters more than people expect. The agent looking at a photo of your floor plan, your bank statement, or your espresso shot changes what's possible.
- Personal-finance is the *"first real win"* for most people. The first time it finds a real subscription you forgot about, you'll never go back.
- A personal skill library forms quickly. After a few months your agent feels custom-fitted to you.

## Try it yourself

The book repo ships a small fictional bank statement so you can try the flagship personal-finance exercise without uploading your own data first. Clone the repo, then:

1. **Flagship — decode a bank statement.** Run against `examples/ch-21-everyone/bank-statement.txt`:
   > *"Read `examples/ch-21-everyone/bank-statement.txt`, summarize the month, group expenses into categories, and flag anything that looks unusual or like a forgotten subscription."*
   **You'll know it worked when** the agent flags the `ABC LIMITED` HKD 0.99 charge — a planted "free trial converted to a real subscription" pattern with a deliberately vague merchant name. The prompt above primes the agent to look. For a harder test of whether *your particular agent* surfaces oddities unprompted, also try the neutral version: *"Read the file and summarize my month."* — and see whether the `ABC LIMITED` charge shows up in the summary at all. The gap between the two answers tells you how much initiative your agent takes on its own.
2. **Hand the agent your own Downloads folder** and ask it to group, propose, and wait for approval before moving anything. If you'd rather practice on a safe mock first, the book repo ships one at `examples/ch-21-downloads/files/` — about 40 stub files with realistic Downloads-folder name patterns (scattered screenshots across years, conference PDFs, duplicate "untitled" CSVs, leftover installers). **You'll know it worked when** the proposal is specific enough that you can approve or redirect each group separately.
3. **Pick one tiny "what is this?" question** from your week — a photo, a screenshot, a confusing form. Ask. If nothing comes to mind, the book repo ships two ready-made mystery items at `examples/ch-21-mystery/` — a dense tax-form fragment and a cryptic smart-thermostat error log. **You'll know it worked when** the answer takes your specifics into account, not the generic version.
