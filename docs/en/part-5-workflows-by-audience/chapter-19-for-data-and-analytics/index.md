# 19. For Data & Analytics People

*A note on how to read Part V.* Read only this chapter if its role matches yours — the other chapters in Part V exist as inspiration for what your colleagues in other roles are doing. The workflows below are real cases from the author's team and from teams the author has worked with. Pick one that sounds useful, drop the suggested files in front of your agent, and run it.

It's Wednesday, and someone in Slack just dropped a CSV with the subject line *"can you take a look? balance keeps dropping and I don't know why."* You open the file. It's 14,000 rows of transactions, three currencies, two date formats, and a column called `memo` that's clearly been used as a dumping ground for whatever the person at the till felt like typing.

Pre-agent, you'd sigh, spin up a notebook, write twenty lines of pandas, and start poking. You'd find the answer, but you'd also spend a half-day on plumbing. This chapter is a tour of the workflows where the plumbing collapses to a sentence — and a few where it doesn't (and shouldn't).

## Equip first: check what's already in your toolbox

Before you drop the CSV in, spend a minute on the move from Ch. 10: *equip first, then engage*. Ask the agent:

> *"What data-source MCPs and analysis skills do I already have? Anything for our warehouse, our reporting database, the spreadsheet I keep pulling from? Any skills for first-pass profiling or weekly reports?"*

If your team has a scoped read-only database MCP and a *"first-pass on a new dataset"* skill, you want both loaded before you start — the agent will use the warehouse directly instead of asking you to export, and apply the team's profiling reflex instead of inventing one. If neither exists, that's a one-sentence install (or a one-conversation skill draft) you do *once* and reuse forever. Don't dive into *"study this CSV"* before checking; you'll spend half the analysis re-teaching plumbing the agent could have inherited.

## "Study this file and tell me what's weird"

The most common analyst prompt in the agent era is the most undignified one:

> *"Here's `~/Downloads/TransactionHistory.csv`. My balance keeps dropping and I don't know why. Study it and tell me what's going on."*

You don't tell the agent what columns to look at. You don't tell it how to parse dates. You don't tell it to deduplicate. You let it look at the file the way you would — peek at the first ten rows, get the column types, eyeball summary stats, plot a few things, then form a hypothesis and check it.

What comes back is a small written report: *"There are 47 duplicate refunds in March. There are 12 transactions tagged `subscription` you didn't have last quarter. Your average daily spend at coffee shops doubled in April. The biggest single hit is a $1,240 charge tagged `MISC` on May 3 — do you want me to find which merchant?"*

You ask the follow-up. It answers. You ask another. Twenty minutes in, you have the explanation. There is no notebook, no library imports, no `df.head()`, no styling the chart. The thing that survived is *the analysis*. Everything else — the plumbing — went where it belonged: into the agent's hands.

Two notes on this pattern:

- **Don't over-specify the question.** "Tell me what's weird" outperforms "compute the mean and standard deviation of column X" surprisingly often. The agent is good at the *open-ended look*; that's what you used to spend the first half-hour doing.
- **Push back on its first answer.** Often the first explanation is plausible but wrong, and the second one (the one you got by saying *"are you sure? what else could explain that?"*) is right. This is the same dynamic as the multi-turn research habit in Ch. 11.

## The scripts you'd never have bothered to write

Half the value of having an agent is that the **threshold for "is this worth automating?"** drops by an order of magnitude. The folder-diff script that would have taken you 40 minutes and that you didn't write because it would only run twice — you write it now, because the cost is one sentence.

A few that come up regularly, each as a one-line ask:

> *"Compare `~/work/exports/2024-10/` against `~/work/exports/2024-11/`. Tell me what's different. Show me the renamed files separately from the actually-new ones."*

> *"Go through `~/Downloads/`, group the files by what they look like they are (invoices, screenshots, music, installers), and propose a sort into `~/Downloads/sorted/`. Don't move anything yet."*

> *"`customers.xlsx` has the same person's name spelled four different ways. Normalize them. Save the result as `customers-normalized.xlsx` with one column for the canonical version and one for the original."*

> *"Take `~/Desktop/spreadsheet-screenshot.png`, extract the table, and give me `spreadsheet-screenshot.csv` next to it."*

These are not jobs you'd open a project for. They're not even jobs you'd open a notebook for. They're one-sentence asks that you used to do by hand, badly, while complaining. Now they're a sentence.

The shift in your head: stop asking *"is this worth scripting?"* Start asking *"is this worth describing?"* The threshold is dramatically lower.

## Light ETL between the places data already lives

Data doesn't usually live in one place. It lives in a sheet that someone in ops updates, a database the engineering team owns, a third-party tool that exports CSVs, and an analytics dashboard. Stitching across those used to mean either a pipeline tool you didn't want to learn or a one-off Python script you'd be embarrassed by.

The agent-era version:

> *"Every Monday morning at 9am, pull last week's revenue from the `reporting` database (read-only role `bi_read`), join it against the `Marketing spend` tab in `https://docs.google.com/spreadsheets/d/<sheet-id>`, compute CAC by channel, and post the result in `#growth` as a chart."*

Three things to notice about that ask:

1. **You name the systems, not the libraries.** You said "the database" and "the sheet" — not "use SQLAlchemy and the Google Sheets API". The agent picks the libraries; you don't care.
2. **You named the *schedule*.** This is when long-running agents (Ch. 14) earn their keep — recurring data work that previously required an entire BI subscription, now done by a sentence and a cron-like trigger.
3. **You handed it credentials it can use safely.** Practically, this is where the *scoped read-only* pattern matters: give the agent a database role that can read everything and write nothing. Then you don't have to gate every query; you can let it loose and just look at what it returns.

A practical version of that scoped-credential pattern lives in a skill the agent loads automatically — the skill documents *"here's the read-only connection, here are example questions it's been asked before, here's the schema."* The agent inherits all of that the moment it's invoked. You ask *"do any customers have on-demand reports turned on?"* and it answers in fifteen seconds, with the actual SQL it ran in case you want to verify.

## Reproducible analysis without the notebook

Notebooks are great until they aren't. The classic failure mode: a cell that re-runs out of order, a variable that's stale, an analysis you can't recreate three months later because the kernel state was a soup.

There's a different shape of reproducibility that works better with agents: **the analysis is a Markdown document, and every chart in it is generated by a small script that lives next to it.** You don't ship the notebook; you ship the markdown report. If you ever need to re-run, you re-run the scripts, and you trust that they'll produce the same numbers because they read from the same sources.

The agent is unreasonably good at producing this shape. You ask: *"write me a report on Q3 churn. Each chart should be generated by a separate small script in `analysis/q3-churn/`. The markdown should explain what each chart is doing and link to the script that made it."*

What you get back is something a colleague three months from now can read top-to-bottom, and (if they want) regenerate every number in it without rooting through your notebook history. The discipline of *"every figure has a script"* is old and good; the agent is just willing to do it without complaining.

## Decoding messy real-world data

Bank statements. Insurance EOBs. Old contracts as PDFs. Customer logs that someone exported to Excel and "cleaned up" by removing the headers. Real data is messy in ways that no schema documents.

A representative ask:

> *"`~/Documents/statements/2024/` has my last twelve months of credit card statements as PDFs. Pull every transaction into a single table, save as `statements-2024.csv`. Categorize them. Flag anything that looks like a duplicate charge or a subscription I forgot about."*

Three real wins from this kind of work:

- **It can *see* the document.** Modern agents read PDFs and images directly. You don't need an OCR step; you just hand it the file.
- **It can *iterate* on the messy parts.** When it can't parse a column, it'll tell you which rows it gave up on, and ask whether you want a heuristic for them. You decide.
- **It refuses to silently make things up.** A good agent, in this mode, will tell you when a number isn't trustworthy — not invent one to keep going. If yours isn't doing this, push back: *"don't fill in values you're guessing at; flag them and ask."*

## Three more shapes that show up weekly

Three concrete workflows that come up enough to be worth naming. Each one is a single quotable ask with explicit file paths.

**Broken-formula hunt in a multi-sheet workbook.** Excel's "the total doesn't tie out" bug is the classic one — somebody dragged a formula one cell too far, or hard-coded a number into what should have been a `SUM`.

> *"Read `sales-q3.xlsx` (multi-sheet workbook). On the 'Orders' sheet find the rows where the total formula broke — the displayed total doesn't match `quantity × price`. Tell me which rows and what the right totals should be."*

You get back a small table: row numbers, displayed totals, correct totals, the delta. You decide whether to patch the sheet or send it back to whoever owns it.

**Decode-and-report in one pass.** This ties to the HTML-output guidance in Ch. 12 — when the output of an analysis is a *thing you'll hand to a colleague*, ask for HTML you can double-click open, not a notebook they'd have to install something to read.

> *"Take `transactions-nov.csv`, decode the messy `memo` column into clean categories, write the cleaned version back as `transactions-cleaned.csv`, and produce a one-page HTML report I can double-click to open with the top 5 categories charted."*

The shape is: clean → save → report. The report is portable, the cleaned CSV is the artifact, and the agent's working code is reproducible next month.

**Enrichment by lookup.** Half the messy data work in finance and ops is *"this table is missing context that lives in another table."* Joins-by-conversation:

> *"Pull the rows in `expenses.xlsx` tagged as 'pending'. For each one, look up the vendor in `vendors.csv` and append the vendor's payment terms as a new column. Save as `expenses-enriched.xlsx`."*

You skim the result. If a vendor didn't match, the agent flags it; you decide whether to add a row to `vendors.csv` or fix the spelling in `expenses.xlsx`.

## Where you still want to drive

A few jobs are still yours, even in the agent era:

- **Defining what the question actually is.** *"Why is revenue down?"* is twelve different questions with twelve different methods. Picking the right one is your job; the agent does the chosen method.
- **Sanity-checking before you trust the chart.** If a number looks too good — or too clean — assume there's a join going wrong somewhere. Ask the agent to show its working.
- **The political layer.** *"Should we share this finding with the leadership team?"* is not an agent question. *"Phrase this finding so it doesn't sound like an indictment of the engineering team's deploys"* — fine, that one the agent can help with.

## When to write it down as a skill

If your agent successfully traced a weird-data thing once, the *next* time someone hands you a similar file, you don't want to re-explain how to look at it. Capture the procedure as a skill (Ch. 16, Ch. 17): "given a transactions CSV, here's how to load it, here's how to dedupe, here's how to categorize, here's what we always check first." Next month's mystery CSV is half the work.

Some shapes of skill that pay off for analysts:

- A *"first-pass on any new dataset"* skill — peek, profile, flag, summarize. The thing you used to do by reflex.
- A *"build a recurring weekly report on X"* skill that you can re-aim at different metrics.
- A *"compare two versions of the same sheet"* skill that captures what you mean by *"same person, spelled four ways."*

## The takeaway

- "Study this and tell me what's weird" beats over-specified questions. Let the agent do the open-ended first look.
- The threshold for *"worth scripting?"* dropped by 10x. Half the value is in the scripts you'd never have written.
- ETL across the systems your data already lives in is now a sentence and a schedule.
- Reproducibility shifts: not the notebook, but a markdown report whose every chart is generated by a small script.
- Capture each repeated procedure as a skill, so next month's data emergency is half as long.

## Try it yourself

If you don't have a real messy file in front of you, the book repo ships one: `examples/ch-19-analytics/transactions-nov.csv` — a fake but realistically messy month of transactions with three currencies, a free-text `memo` column, and a planted duplicate. Clone the repo and point your agent at that folder. The three starter exercises in `examples/ch-19-analytics/README.md` ratchet up the agent's responsibility:

1. **Categorize and rank.**
   > *"Read `examples/ch-19-analytics/transactions-nov.csv`, decode the memo column into clean categories, and tell me my top 5 categories of spend in USD-equivalent."*
   **You'll know it worked when** the agent picks a sensible category taxonomy without you having to name one, and explains how it handled the three currencies.
2. **One-page HTML report.**
   > *"Same file — produce a one-page HTML report I can open in my browser, with a chart for category breakdown and a table of all transactions over HK$500."*
   **You'll know it worked when** you double-click the HTML and it opens, looks reasonable, and doesn't require a Python environment to view.
3. **Duplicate detection.**
   > *"Same file — find any duplicate transactions (same amount, same vendor, within 3 days) and flag them."*
   **You'll know it worked when** the agent flags the planted duplicate and *doesn't* over-flag the legitimately repeated subscription charges.

Then graduate to your own data:

4. **Hand the agent a CSV from your own work** — any messy file you've been avoiding. Ask *"study this and tell me what's weird."* Don't tell it what to look for. **You'll know it worked when** it surfaces something you didn't already know.
5. **Automate one bit of data plumbing** you do every week or month — a join, a refresh, a cleanup. Ask the agent to do it on a schedule and post the result somewhere visible. **You'll know it worked when** you stop doing it by hand on the next cycle.
