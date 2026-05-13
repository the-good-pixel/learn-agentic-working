# 4. A 10-minute first win

You have ten minutes. Maybe a coffee, maybe a tea, maybe you're on the train. The goal of this chapter is that by the time the mug is empty, an agent will have done one real piece of your actual work — not a toy task, not a tutorial, a thing you'd otherwise have done yourself in the next hour.

No theory. No diagrams. We did that in the last two chapters. This one is just the doing.

**A note before you start.** Later in this book you'll see chapters on sub-agents, parallel worktrees, multi-agent workflows, scheduled autonomous agents, custom MCP servers, vibe coding. **Ignore all of that for today.** None of it is needed for your first win, your first week, or, honestly, your first month. The advanced patterns pull you in *when a real task makes you wish you had them*. Today we're doing the simplest possible loop: brief the agent, watch it work, look at the result. That's it.

## If you have no command-line experience, read this first

*Experienced terminal users: skip this section.* If you've never opened a terminal before, the next five paragraphs are everything you actually need. The rest of the chapter assumes them.

**Important framing**: terminal proficiency is **not what this book is about**. We're giving you the bare minimum to run an agent and have a conversation with it — nothing more. If after these five paragraphs the terminal still feels alien, **invest 15–30 minutes in a real tutorial before continuing** — you'll get far more out of the rest of the book. Two recommendations:

- **MDN's [Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)** — text-based, ~20 minutes, the right depth for this book.
- **Any 10–15 minute YouTube video** searching *"terminal basics for beginners macOS"* or *"…Windows"* — dozens of good free ones; pick one with recent views.

Then come back. The five paragraphs below are the survival kit; the tutorial above is the foundation.

**What a terminal is.** A terminal — also called the command line, or the shell — is that black (or white) window with text in it that you've seen over someone's shoulder. It exists because before there were buttons and icons, the way you told a computer to do something was by typing the instruction and pressing Enter. It's still there because, for a lot of tasks, typing is faster and more precise than clicking. You are *not* going to "code" in it for this book. You'll mostly type sentences in English to an agent and read what comes back. The terminal is just the room where that conversation happens.

**How to open one.** On macOS, hit Cmd-Space to open Spotlight, type *Terminal*, press Enter — a window opens. On Windows, the smoothest path is to install [Windows Terminal](https://aka.ms/terminal) from the Microsoft Store; if you can't install software, Command Prompt (search *cmd* in the Start menu) works for now. On Linux, your distribution ships one — GNOME Terminal, Konsole, or similar; it's in your applications menu under *Terminal*.

**The "current folder" concept.** Every terminal window is always sitting inside one folder on your computer — its *current folder* (sometimes called the *current directory* or *working directory*). When you launch an agent, it works on the files in that folder. So if you want the agent to look at the files in your `Downloads` folder, you first move the terminal into `Downloads` with the command `cd ~/Downloads` (`cd` means *change directory*; `~` means your home folder). Then you launch the agent. This is the single most common stumble for new users — *"the agent can't see my file"* almost always means *"the terminal is in a different folder than the file."*

**How to type a prompt and read the output.** Once the agent is running, you'll see a `>` prompt. Type your sentence in English. To put in a line break without sending, most agents take Shift-Enter (or `\` then Enter); plain Enter sends. The agent's response *streams* — words appear as it thinks, not all at once. You'll see lines like `Read(file.csv)` or `Bash(ls)` — those are *tool calls*, the agent reaching for something on your machine. There's a difference between the agent *thinking out loud* (text scrolling, work happening) and the agent *asking you a question* (it stops and waits for your input). Wait for the question; answer it; otherwise just watch.

**How to interrupt and how to quit.** If the agent heads in a wrong direction, press Ctrl-C — it stops what it's doing right then. Interruption is cheap and the agent will not break anything mid-action; it just stops. To quit the agent cleanly, type `/exit` or press Ctrl-D. To close the terminal window itself, close it like any other window.

*That's it. Everything else from here uses these five things.*

## Step 1: pick your task (1 minute)

Don't think too hard. Pick something from the last 48 hours where you typed a question into ChatGPT or Gemini and then had to *do something* with the answer — paste it into Gmail, paste it into a doc, search for a file, update a spreadsheet, summarize and post to Slack. That copy-paste step is the chatbot tax from Ch. 1. Today the agent eats it.

Some real candidates from the kinds of tasks people actually bring to a first session:

- *"Look at this CSV in my Downloads folder and tell me what's weird about it."*
- *"Read these three meeting-notes files and turn them into a punch list of action items."*
- *"Look at the screenshots I just saved and figure out what's wrong with this layout."*
- *"Compare the pricing pages of these three competitors and put it in a table."*
- *"Find every TODO comment in this project and group them by file."*

Pick one. Have the file, folder, or links handy. You don't need to write the prompt yet.

## Step 2: install the agent (3 minutes)

We'll use **Claude Code** as the default. The same shape works for Codex, OpenCode, and Gemini CLI — Ch. 6 covers the others side-by-side.

If you're on macOS or Linux, open a terminal (on macOS: hit Cmd-Space, type *Terminal*, press Enter) and paste:

```bash
curl -fsSL claude.ai/install.sh | bash
```

If you're on Windows, install [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) first, open the Ubuntu shell it gives you, and then run the same line. (If WSL feels intimidating, that's fine — once it's installed, it's just another terminal window.)

The installer prints a few lines, then tells you to run:

```bash
claude
```

Do that. On first run it will open a browser tab and ask you to sign in. Use a Claude.ai account if you have one (the Pro plan covers light usage; a Max plan is what most daily users end up on). If you don't, create one — it takes a minute.

When it drops you into a prompt that looks like:

```
> 
```

…you're in. The agent is now running in whatever folder your terminal was sitting in. If you want it to operate on a *specific* folder for today's task (the project folder, the meeting-notes folder, the Downloads folder), close the agent with `Ctrl-C`, `cd` into that folder, and run `claude` again. (`cd` means *change directory* — type `cd ~/Downloads` and you're in your Downloads folder.)

**Non-technical reader, you're done with the scary bit.** The rest of this chapter is sentences in English.

**In other tools.** If you went with Codex instead, the install is `npm install -g @openai/codex && codex`. If you went with OpenCode: see [opencode.ai](https://opencode.ai). If you went with Gemini CLI: `npm install -g @google/gemini-cli && gemini`. The conversation shape from here is the same in all four.

## Step 3: brief the agent (1 minute)

Type your task in plain English. Brief it like you'd brief a smart colleague who walked into the room — give it the context it doesn't have, point at the files, say what *good* looks like.

Bad: *"Summarize my meeting notes."* (Which notes? What kind of summary? For whom?)

Better: *"There are three files in this folder named `meeting-2026-05-*.md`. Each is raw notes from a customer call this week. Read all three, find recurring themes across them, and write me a one-page summary I could send to my product team. Use plain Markdown."*

You don't have to phrase it perfectly. If you're vague, the agent will ask. That's a feature, not a failure — agents that ask one clarifying question up front beat agents that guess and waste five minutes.

## Step 4: watch it work (4 minutes)

This is where it gets fun, and also where you'll feel a tiny urge to look away. Resist it.

The agent will start narrating: *"I'll list the files first… reading `meeting-2026-05-08.md`… reading `meeting-2026-05-09.md`…"* You'll see each tool call stream past — `Read`, `Glob`, `Bash`. You'll see proposed file changes appear as diffs. Some agents pause and ask permission for actions they consider risky; some run straight through. (Ch. 7 explains why, and how to tune that.)

The most important habit to start practicing right now is **monitor, don't block**. Don't stop the agent to second-guess every step. Watch the stream. If a step looks wrong — it's reading the wrong files, going in a direction you didn't intend — hit Escape (or Ctrl-C in some tools) and redirect with a sentence: *"Stop. You're reading the archive folder; I meant the current week."* Interruption is cheap. You don't have to gate every step.

Three things will probably happen:

1. **It will do the thing.** Roughly 70% of well-scoped first tasks land cleanly on the first try.
2. **It will do most of the thing and miss a detail.** Tell it: *"Good, but the second theme — pricing complaints — should be split into 'discount asks' and 'comparing to competitors'."* It fixes it.
3. **It will go sideways.** It misreads the task, runs off into a tangent, or asks for the wrong permission. Hit Escape, retype the prompt more clearly, try again.

All three outcomes are wins on day one. Even the third one tells you something useful — your prompt didn't carry enough context. Add what was missing and try once more.

## Step 5: look at what it made (1 minute)

When the agent says it's done, look at the result. If it wrote a file, open it. If it filled in a spreadsheet, look at the spreadsheet. If it answered in chat, read the answer.

This is the **review** step, and it's the same step whether the deliverable is code, an email draft, a meeting summary, a Linear ticket, or a chart. The review isn't always a code review — see Ch. 13 for the longer version of this idea. For today, just look. Does it match what you asked for? Is anything off? If yes, *tell the agent*. Don't fix it yourself. The whole point is to stay in the agent loop and let it do the typing.

If the result is good, you're done. Close the terminal, finish your coffee. If you want one more rep, ask it to *also* draft the Slack message that goes with the summary, or *also* create three tickets in your project tracker.

## What not to do today

You will be tempted to do a few things. Don't. Not today.

- **Don't install five MCPs at once.** You won't need any beyond what ships built-in for this first task. Ch. 9 walks through the day-one MCP set.
- **Don't write a `CLAUDE.md`.** That's the next investment after a few sessions (Ch. 8). On a first run, the conversation itself is enough context.
- **Don't write a skill.** A skill is your reaction *to* a repeated task. You haven't repeated anything yet (Ch. 17–19).
- **Don't open three terminals and try parallel runs.** One agent, one task, one window today.
- **Don't watch a YouTube tour first.** The fastest way to get good at this is to use it badly on a real task, not to consume more setup content.

The point of all of these is the same: the first win is *one task, end to end, in one window*. Everything else is opt-in, later.

## What just happened

You wrote one sentence. The agent read your files, made decisions about them, wrote a result, and showed it to you. Mechanically, the five-box diagram from Ch. 2 just ran end-to-end on your machine, against your real data, in real time.

The feeling, the first time, is a small jolt. Most people say some version of *"oh, that's what they meant"*. The chatbot-to-agent shift is one of those things you don't really believe until your own files are involved. Now they have been.

The next 60 minutes of investment, in Part II, is what turns a satisfying one-off into a daily habit — teaching the agent who you are (Ch. 8), giving it access to the systems you use every day (Ch. 9), and setting sensible defaults for what it can do on its own (Ch. 7). But none of that is required to keep using what you just set up. You can close this book right now and get value from it tomorrow.

## The takeaway

- One agent, one folder, one task, one window. That's the entire first-win recipe.
- Brief it like a smart colleague — give it the context, point at the files, say what good looks like.
- Monitor, don't block: watch the stream, interrupt with a sentence if it drifts, let it run otherwise.
- Skills, MCPs, sub-agents, parallel work, scheduled runs — *all opt-in later*. None of them are gates between you and a useful first day.

## Try it yourself

Do exactly the chapter:

1. Pick one task from the last 48 hours that ended with you copy-pasting an AI's answer somewhere.
2. Install one terminal agent (Claude Code by default).
3. Run the agent in the folder where the task's files live.
4. Brief it in one paragraph. Watch it work.
5. Review the result. If it's off, redirect with a sentence and try again.

**You'll know it worked when** the agent produced a result you'd otherwise have produced yourself in the next hour, and you didn't copy-paste anything in or out of a chat window to get there. Bonus points if the thought *"oh — I could do this for the other thing on my list right now"* arrives unprompted.

*If you can't think of one, try this*: (a) rename the 30 photos in `~/Downloads/trip-japan/` by date taken; (b) summarize the three PDFs sitting on your desktop into a one-page brief; (c) draft three variant subject lines for an email you have to send today.

## What's next

The next chapter is the big strategic one — and the one most people quietly need. Before you go subscribe to "AI [your job]" SaaS at $20 a month per tool, read it. A general-purpose agent, pointed at the systems you already pay for, replaces a surprising number of those subscriptions.
