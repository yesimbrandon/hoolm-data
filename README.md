# hoolm-data

The single source of truth for **Heroes of Overleague Machine** game data.

| File | Root key | Contents |
| --- | --- | --- |
| `characters.json` | `characters` | Heroes & titans, their stats, thresholds and abilities |
| `glossary.json` | `glossary` | Keywords (`[Fear]`, `[Pierce]`, ...) |
| `rules.json` | `rules` | Rulebook sections (nested) |

Edit these with **hoolm-editor** (`../hoolm-editor`). Avoid hand-editing unless needed.

## Pushing data to the apps

```
npm run sync        # copy files into every project in sync.config.json
npm run sync:dry    # preview
```

Targets (see `sync.config.json`):

- Tracker app (Flutter) → `heroes_of_overleague_machine/assets/data/`
- War Table (web) → `hoolm-war-table/public/data/`

Then commit in each app repo as usual.

## Schemas

### Character

```jsonc
{
  "name": "Monsieur Le Beau",          // required, unique
  "class": ["DPS"],                    // DPS | Tank | Support | TITAN
  "attributes": ["Fearless"],
  "base": "50mm",
  "linkedCharacter": "Bravo 1",        // optional, name of another character
  "isTransformOnly": false,            // optional; hidden from drafting
  "threshold": { "name": "...", "value": "...", "type": "regulated" }, // optional; type: regulated | restricted | repeatable (omit = auto-detect)
  "speed": 7,                          // number, or text like "Special*"
  "defense": 13, "health": 20, "armor": 0, "magicResist": 0,
  "actionPoints": 7, "recovery": 4,
  "slayingReward": "...",              // optional
  "abilities": [
    { "name": "Boutonnière", "type": "Attack", "range": "B8", "damage": 7,
      "cost": "1 AP", "rollRange": "...", "value": "Crit [Fear]" }
  ]
}
```

### Keyword

```json
{ "term": "Fear", "description": "-1 ATK", "power": 2 }
```

`power` is optional. Text anywhere can reference a keyword with square brackets: `[Fear]`, `[Explode 2]`.

### Rule section

```json
{ "id": "core-concepts", "title": "Core Concepts", "body": "Text with **bold**, - lists and [Keywords].", "sections": [] }
```

`sections` nests sub-sections to any depth. `id` is unique across the whole rulebook.

## Backups

Every save from the editor copies the previous file into `.backups/` (git-ignored).
