#!/usr/bin/env node

import { spawn } from "child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const args = [require.resolve("../lib/cli"), ...process.argv.slice(2)];

const spawned = spawn("node", args, {
  env: Object.assign({}, process.env, { FORCE_COLOR: "1" }),
});

process.stdin.pipe(spawned.stdin);
spawned.stdout.pipe(process.stdout);
spawned.stderr.pipe(process.stderr);
spawned.ref();
spawned.on("exit", (code, _signal) => {
  process.exit(code);
});
