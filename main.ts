// Fortune Cookie Wisdom for Developers — main.ts (v2)
//
// The entry is one original fortune-cookie line for a software developer.
// Why this line, sharpened: a tired senior engineer inherits code every
// day, and the truest thing about legacy code is that it arrives without
// its author — no handover, no goodbye, just the code. So the line turns
// the codebase itself into the farewell letter the author never got to
// write: "the code you inherit IS a letter". It reads like a real fortune
// cookie (one short balanced sentence, second person, lands in a single
// breath), it is true about a developer's day (inheriting code, reading
// someone else's decisions), and the twist — the farewell was never said,
// the code is the only message left — rewards a second read. 81
// characters, well inside the 120-character gate; nothing here repeats a
// familiar saying ("comment your code", "it works on my machine").
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FORTUNE =
  "The code you inherit is a letter from a developer who left before saying goodbye.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 120 characters,
// not only white space, and a fortune cookie is one line — so the entry
// must contain no newline at all. Keep the entry exactly as written: no
// trailing newline, no extra words.
if (FORTUNE.length < 1 || FORTUNE.length > 120) {
  throw new Error(`fortune is ${FORTUNE.length} characters, outside 1-120`);
}
if (FORTUNE.trim().length === 0) {
  throw new Error("fortune must not be only white space");
}
if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
  throw new Error("fortune must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", FORTUNE, "utf8");

// Round-trip guard: what was written must read back byte-identical.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== FORTUNE) {
  throw new Error("round-trip mismatch: entry.txt does not match the fortune");
}
