# Miner Rush

[![make.fun](https://make.fun/badge/best-game-01.svg)](https://make.fun/bounty/best-game-01)
[![rank](https://make.fun/badge/best-game-01/norv33/miner-rush/rank.svg)](https://make.fun/bounty/best-game-01)
[![reward](https://make.fun/badge/best-game-01/norv33/miner-rush/reward.svg)](https://make.fun/bounty/best-game-01)

An original arcade mining game for the make.fun **"Make the best game"**
bounty ([best-game-01](https://make.fun/bounty/best-game-01)). Drive a mine cart along the track and catch the
treasure falling from above — gold (+10), gems (+25), diamonds (+50) —
while dodging rocks and bombs. You have 3 lives; a rare lantern restores
one. Score builds a combo multiplier up to ×5, and you level up every
400 points. Your best score is saved in the browser, so it is still
there when you come back to beat it.

## How to play

- Move: `←` / `→` or `A` / `D`, mouse, or drag on touch
- Pause: `P` or the **Jeda** button
- Start / restart: **Mulai Main** / **Main Lagi**
- Goal: catch as much treasure as you can, don't let rocks and bombs
  destroy the cart. Game over when you run out of lives.

## Files

- `game/index.html` — the whole game in one static file (no build step,
  no network requests, no external assets). Open it in desktop Chrome
  and play.
- `screenshots/` — 4 real screenshots of the game rendering in a
  browser: start screen, gameplay, pause, game over. The first by name is the cover.
- `main.ts` — Node 22, standard library only. Hands the entry in: checks
  that `game/index.html` and `screenshots/` exist, copies `game/` and
  `screenshots/` to `/output`, and writes `/output/dossier.json` with
  `buildDossier` from `vendor/makefun-game.ts`.
- `vendor/makefun-game.ts` — the kit's copy, unchanged.
- `serve.ts` — tiny static server for local testing (kit starter).
- `LICENSE` — MIT.

## Verify

```sh
# Play it locally (game at http://localhost:8080)
node serve.ts

# Build the submission output twice; both runs must be byte-identical
mkdir -p out1 out2
MAKEFUN_OUTPUT_DIR=out1 node main.ts
MAKEFUN_OUTPUT_DIR=out2 node main.ts
diff -r out1 out2 && echo "identical"
ls -R out1   # game/ + screenshots/ + dossier.json
```

## Submission

Public GitHub repository, created on or after the competition opened
(16 Nov 2026), with this content at the submitted commit. Deadline:
**Wed 19 Nov 2026, 01:00 WIB**. Submit via make.fun ("Submit an
entry" on the [bounty page](https://make.fun/bounty/best-game-01)) with the AI transcripts that built it.
