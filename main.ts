// Miner Rush entry for make.fun "Make the best game" (best-game-01).
// Node 22, standard library only. Hands the game in: copies game/ and
// screenshots/ from beside this file to /output and writes
// /output/dossier.json with buildDossier from vendor/makefun-game.ts.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the game locally with `node serve.ts`, then open http://localhost:8080.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly instead of handing in a half-empty entry: the game file
// and the screenshots must exist before anything is copied.
const gameEntry = join(here, 'game', 'index.html');
if (!existsSync(gameEntry)) throw new Error('missing game/index.html');
const shots = join(here, 'screenshots');
if (!existsSync(shots) || readdirSync(shots).length === 0) throw new Error('missing screenshots/');

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
cpSync(shots, join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse (more
// than 4 screenshots or one over 256 KiB; more than 993 files in game/
// or 48 MiB of game files, in all, or a path under game/ over 1000
// bytes: game/ counts beside /output's own 1000-entry cap, its
// screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);

const gameBytes = statSync(gameEntry).size;
console.log(`Miner Rush handed in: game/index.html (${gameBytes} bytes) + ${readdirSync(shots).length} screenshots -> ${out}`);
