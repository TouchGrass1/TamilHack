/**
 * Generates a short WAV file for pipeline smoke tests.
 * Usage: node scripts/make-sample-wav.mjs [out.wav] [seconds]
 */

import { writeFileSync } from "node:fs";

const out = process.argv[2] ?? "tests/silence.wav";
const seconds = Number(process.argv[3] ?? 1);
const sampleRate = 16000;
const samples = sampleRate * seconds;
const dataSize = samples * 2; // 16-bit mono

const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(1, 22); // mono
header.writeUInt32LE(sampleRate, 24);
header.writeUInt32LE(sampleRate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(dataSize, 40);

// A quiet 440Hz tone so the file isn't pure digital silence
const data = Buffer.alloc(dataSize);
for (let i = 0; i < samples; i++) {
  const v = Math.round(Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 300);
  data.writeInt16LE(v, i * 2);
}

writeFileSync(out, Buffer.concat([header, data]));
console.log(`wrote ${out} (${seconds}s, ${sampleRate}Hz mono)`);
