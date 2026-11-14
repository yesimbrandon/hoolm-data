#!/usr/bin/env node
/**
 * Copies the canonical HOOLM data files into each consuming project
 * (tracker app, war table) as listed in sync.config.json.
 *
 *   node scripts/sync.mjs            copy files
 *   node scripts/sync.mjs --dry-run  show what would be copied
 *
 * Every file is parsed as JSON before copying so a broken file never
 * reaches the apps. Targets whose project folder does not exist are skipped.
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dryRun = process.argv.includes('--dry-run');

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const config = JSON.parse(await readFile(path.join(ROOT, 'sync.config.json'), 'utf8'));

  // Validate all source files up-front.
  const sources = new Map();
  for (const target of config.targets) {
    for (const file of target.files) {
      if (sources.has(file)) continue;
      const src = path.join(ROOT, file);
      const text = await readFile(src, 'utf8');
      try {
        JSON.parse(text);
      } catch (err) {
        throw new Error(`${file} is not valid JSON: ${err.message}`);
      }
      sources.set(file, text);
    }
  }

  let copied = 0;
  let skipped = 0;
  for (const target of config.targets) {
    const projectDir = path.resolve(ROOT, target.projectDir);
    if (!(await exists(projectDir))) {
      console.log(`- SKIP ${target.name}: ${projectDir} not found`);
      skipped++;
      continue;
    }
    const dataDir = path.join(projectDir, target.dataDir);
    if (!dryRun) await mkdir(dataDir, { recursive: true });
    for (const file of target.files) {
      const dest = path.join(dataDir, file);
      if (!dryRun) await writeFile(dest, sources.get(file), 'utf8');
      console.log(`${dryRun ? '~ would copy' : '+ copied'} ${file} -> ${dest}`);
      copied++;
    }
  }
  console.log(`Done: ${copied} file(s) ${dryRun ? 'to copy' : 'copied'}, ${skipped} target(s) skipped.`);
}

main().catch((err) => {
  console.error(`Sync failed: ${err.message}`);
  process.exit(1);
});
