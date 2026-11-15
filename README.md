# HOOLM Data (Master Game Data Folder)

This folder holds the **master copies** of all characters, keywords, and rules for **Heroes of Overleague Machine**.

> **Important:** You do **not** need to open or edit the files in this folder by hand! Instead, use the **HOOLM Editor** (`hoolm-editor`), which edits these files for you safely with buttons and forms.

---

## How Everything Fits Together

You have 4 folders in `C:\Users\brand\.gemini\antigravity-ide\scratch`:

1. **`hoolm-editor`** — The visual website where you add/edit characters, keywords, and rules.
2. **`hoolm-data` (This folder)** — Where the editor saves your master data files.
3. **`heroes_of_overleague_machine`** — The Tracker & Codex App (for tracking matches, health, rounds, and building rosters).
4. **`hoolm-war-table`** — The virtual tabletop web game (where you move models on a digital map and roll dice).

When you click **"Sync to apps"** inside the HOOLM Editor, it copies the master files from this folder into **both** the Tracker App and the War Table automatically.

---

## What Files Are in Here?

- **`characters.json`** — All Heroes and Titans, their stats, thresholds, and abilities.
- **`glossary.json`** — All game keywords (like `[Fear]`, `[Pierce]`, `[Stun]`) and their definitions.
- **`rules.json`** — The game rulebook sections.
- **`.backups/`** — Every time you click **Save** in the editor, a backup copy of your previous file is saved here with the date and time, so you never lose work by accident.

---

## Manual Sync (Only if you aren't using the "Sync to apps" button)

Normally, you just click the **"Sync to apps"** button at the top-right of the **HOOLM Editor**.

If you ever want to copy the files into the apps using PowerShell instead:

1. Open **PowerShell**.
2. Copy and paste these two lines and press **Enter**:

```powershell
cd C:\Users\brand\.gemini\antigravity-ide\scratch\hoolm-data
npm run sync
```
