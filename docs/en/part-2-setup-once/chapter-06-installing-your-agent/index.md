# 6. Installing your agent

It's Saturday morning. You finally have an hour to try this. You open your laptop, hit the page that says *"install Claude Code"*, and the first instruction is:

> *"Run `npm install -g @anthropic-ai/claude-code` in your terminal."*

You stop. You don't have a terminal open. You don't know if you have `npm`. You're not sure whether your `node` is the right version, or if you ever installed `node` at all. The page assumes you know. You don't.

This is the moment most non-technical readers quietly close the tab and go back to the chatbot. Don't.

Here's the thing nobody puts on the install page: **the first install is the only install you do by hand.** Once any one of these agents is running on your machine, *it* handles the rest — installing the others, fixing your shell config, setting up aliases, untangling your `node` versions, even editing the dotfiles you've never heard of. "Set yourself up nicely for me" is a real, valid prompt.

So we're going to do exactly the one thing you can't outsource, and let the agent do everything else.

## The three you'll actually consider

Three agents matter for most readers right now. They all run in a terminal. They all do roughly the same thing — read your files, edit them, run commands, call out to real services through MCPs (Ch. 9). They differ in defaults and feel.

- **Claude Code** (Anthropic). The running example through the book and the daily driver behind most of the workflows you'll see. Strong tool use, strong file editing, mature skills and MCP ecosystem. Paid: included in Claude Pro/Max ($20–$200/month depending on tier), or pay-per-token on the API.
- **Codex** (OpenAI). The CLI form of OpenAI's coding agent. Familiar feel for ChatGPT Plus/Pro users — your existing subscription includes meaningful CLI use. Different defaults around approval prompts.
- **OpenCode**. Open-source. Model-agnostic — point it at Claude, GPT, Gemini, a local Llama, whatever. No monthly subscription to the tool itself; you pay the model provider directly. Good fit if you already have an API key and want to keep options open.

You don't need to pick the "right" one. They all do the job. Pick the one whose pricing you already pay for, install it, and move on. If you're a heavy ChatGPT user, start with Codex. If you've been paying for Claude, start with Claude Code. If you want zero lock-in, start with OpenCode.

You can also run two side-by-side later. It's normal — many people run Claude Code as the daily driver and use Gemini (through a skill) as a sparring partner for research and second opinions.

## The one install you do by hand

Pick one of the three. Then run *its* install command. That's it. Everything in this section is something you'd find on the vendor's install page; we include it so you have it in one place.

**Claude Code.** You need Node.js 18+ on your machine. If you have it: `npm install -g @anthropic-ai/claude-code`, then run `claude` in any project folder and log in. If you don't have Node — and you genuinely don't know — open your terminal (on macOS: Spotlight → "Terminal"; on Windows: install Windows Terminal from the Store) and type `node --version`. If it errors, install Node first via [nodejs.org](https://nodejs.org) (LTS version) or `brew install node` on a Mac with Homebrew.

**Codex.** `npm install -g @openai/codex`, then `codex` in a project folder; sign in with your ChatGPT account.

**OpenCode.** `npm install -g opencode-ai` (or follow the install snippet on [opencode.ai](https://opencode.ai)). Then `opencode` in a project folder. Point it at the model provider whose API key you have.

That's the entire manual portion. If you're a non-technical reader, here's the truth nobody tells you: you can copy each of those three commands without understanding them. They're install instructions, not code you have to read. Paste, hit enter, follow the login prompt.

If something fails — wrong Node version, weird permission error, "command not found" — *don't try to fix it yourself*. You're about to have an agent that's better at debugging your machine than you are. As soon as one is running (even an older one), the rest of this chapter is its job, not yours.

## "Set yourself up nicely for me"

This is the prompt. Once `claude` (or `codex`, or `opencode`) responds in your terminal, your first real conversation with it can be exactly this:

> *"Set yourself up nicely on this machine. I want a clean shell with helpful aliases, a sensible prompt, my path organized, and the other major agents (Codex, OpenCode) installed alongside you so I can try them. Walk me through anything that needs my approval. I'm on macOS / Windows / Linux."*

Watch what happens. The agent looks at your shell (probably `zsh` on a recent Mac, `bash` elsewhere). It reads your existing `.zshrc` or `.bashrc` — the **dotfile** where your terminal's personality is configured. It proposes additions: a friendlier prompt, an alias for `g` → `git`, `cdr` to jump to your repos folder. It offers to install Homebrew if you don't have it, asks before installing each tool, and shows you each line it's about to add to your config files.

You read along. You approve or push back. Five minutes later your terminal is set up better than it's been in years, and you didn't write any of it.

**Things the agent will happily handle if you ask:**

- Installing the other agents (so you can compare them).
- Installing useful CLI utilities (`ripgrep`, `fzf`, `jq`, `gh` — the GitHub CLI).
- Setting your default editor, configuring git with your name and email, generating an SSH key for GitHub.
- Fixing whatever broke in the first install. ("Node says permission denied when I run npm install -g — fix this without using sudo.")
- Creating a `~/code/` or `~/Development/` folder and organizing the projects you already have.

**Things to keep an eye on** (this is the *monitor* in *monitor, don't block* — Ch. 7):

- Adding lines to your shell config is reversible (the agent can comment them out), but you want to see what it adds. Glance at each diff before approving.
- Installing system-wide packages is fine; uninstalling them is fine. Wiping your existing config without backing it up first is annoying. If you're nervous, say: *"back up any file before you change it."* The agent will.

## Picking a project folder and trying it once

Agents are built to work on **a project** — a folder on your computer. They scope their attention to the folder you launch them in. This is by design: it keeps the agent from wandering through your entire home directory looking at things it shouldn't.

For your first real run, make a folder. Anything. A throwaway is fine.

```bash
mkdir ~/first-agent && cd ~/first-agent
claude   # or codex, or opencode
```

The agent starts a session. The first message you type can be as simple as *"create a file called `hello.md` with three things you can help me do this week"*. It writes the file. You open it. Done — you have an agent.

If you want a more useful first session, Ch. 4's "10-minute first win" walks through one end-to-end. The point of *this* chapter is that you've crossed the line from "AI in a browser tab" to "AI living on my machine, with hands."

## In other tools

The mental model is the same in every CLI agent.

- **Claude Code**: `claude` in a folder, login on first run, free-form chat. Skills, MCPs, hooks, sub-agents, plan mode.
- **Codex**: `codex` in a folder, ChatGPT login. Similar tool use, slightly more conservative default approval prompts.
- **OpenCode**: `opencode` in a folder, model provider configured via env vars or `~/.config/opencode/`. Brings-your-own-key.
- **Cursor** and **Windsurf** are agents *inside an IDE* (a code editor), not in a terminal. If you live in an editor all day and are an engineer, they're worth a look. If you don't, the terminal agents above are a cleaner starting point — they don't require learning a new editor.
- **Gemini CLI** is Google's terminal agent. Worth installing as a second opinion / research partner; we treat it that way later in the book.

## What about cost?

Rough sense, at time of writing:

- A casual user — a few sessions a week, mostly drafting and reading — is fine on a $20/month Claude Pro, ChatGPT Plus, or pay-per-token at $10–$30/month.
- A daily heavy user — multiple long sessions, big codebases, lots of tool calls — wants Claude Max ($100–$200/month) or equivalent. Heavy users routinely report the top tier feels cheap relative to the time saved.
- OpenCode against your own API key gives you fine-grained cost visibility at the price of doing the math yourself. Useful if you're cost-sensitive or running for a team.

Ch. 24 goes deep on cost, quality, and the question of "am I overpaying?". Don't optimize this now. Pick a tier, run for a week, then decide.

## A checklist for the end of this chapter

You should now have:

- [ ] One of Claude Code / Codex / OpenCode installed and able to start a session in a project folder.
- [ ] Logged in (or pointed at an API key) and confirmed it responds.
- [ ] A throwaway project folder where you ran at least one prompt and got a real file out of it.
- [ ] (Optional but recommended) Asked the agent to "set yourself up nicely on this machine" and watched it tidy your shell, install useful utilities, and — if you want — install the other agents alongside.

If any of those isn't done, the next chapters will still make sense, but the exercises won't run.

## Try it yourself

**Exercise: the meta-install.** With your newly-installed agent, paste this exactly:

> *"Audit my shell config and propose five improvements that would make my terminal nicer to live in. For each one, tell me what it does in one sentence, and ask before applying. Then install `gh` (the GitHub CLI) and `ripgrep` if I don't have them, and run a quick sanity check that both work."*

**You'll know it worked when** your terminal has a better prompt than it did this morning, you understand each of the five changes the agent made (because it explained them), and `gh --version` and `rg --version` both return numbers in your terminal.

## What's next

The agent is on your machine and has hands. The natural next question is: *how much should I let it do without asking me first?* That's Ch. 7.
