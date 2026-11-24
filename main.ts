// Charm the Commuter: Forecast a City That Isn't — burn entry.
// Writes one weather forecast (<=140 chars) for a city that does not
// exist, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The joke: Mumbleton is invented, the forecast keeps broadcast register
// ("overcast, with a 90% chance..."), and the twist is pure commuter pain —
// your umbrella turning inside out before you even reach the platform.
// Revision: the v1 line was 100 chars and left 40 spare; the added second
// sentence gives the city a concrete piece of commuter life — the 8:04
// running late, as usual — so Mumbleton feels like a real place with real
// transit, and it spends the spare characters on a second relatable beat
// instead of padding the first one.
// Validated locally: 128 chars, 128 bytes, sha256
// ccdca373d357d476706fac32b356765ef743085fd74e8a001f3ed385ac1272b5, read-back OK.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "Mumbleton: overcast, with a 90% chance your umbrella turns inside out before you reach the platform. The 8:04 is late, as usual.";

// Validation: 1-140 chars, single line, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 140) throw new Error(`length ${ENTRY.length} out of 1-140`);
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: file on disk must be byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${ENTRY.length} chars, sha256 ${sha}, read-back OK`);
