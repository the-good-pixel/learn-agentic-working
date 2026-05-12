# Ch. 21 — Taming a Downloads Folder

A mock Downloads folder with ~40 files of mixed type, age, and name pattern. **Most files are empty or contain a single stub line** — the exercise is about filenames, dates, and metadata, not file contents.

The `files/` subfolder simulates what a real Downloads folder looks like after a year of neglect: scattered screenshots across years, PDFs from conferences, installers you forgot to delete, duplicate "untitled" CSVs, two `report_FINAL_v2*.docx` (one with `_REAL`), a temp Word lockfile, photos from a phone, a few zips, and a mysterious `README.md` you didn't put there.

## Exercise

> Point your agent at `examples/ch-21-downloads/files/`. Ask:
>
> *"Group these files into sensible categories and propose what to keep, archive, or delete. Wait for my approval before moving anything."*

The agent should propose buckets like *old screenshots*, *conference downloads*, *receipts*, *installers safe to delete after install*, *photos to move to Photos library*, *temp/junk*, *unclear — ask the user*. Each bucket should have a specific recommendation, not just a label.

**You'll know it worked when** the proposal is specific enough that you can approve, reject, or redirect each bucket separately — and the agent doesn't touch anything until you say go.
