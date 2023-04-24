#!/usr/bin/env node

import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';
import minimist from 'minimist';

import './scripts/deno-polyfills.js';

import { askUser } from './scripts/prompt.js';
import { exitOnError, exitOnMissingTemplate } from './scripts/utils.js';

const DEFAULT_TARGET_DIR = 'elysia-project';

try {
  /**
   * @type {{ _: string[], template?: string }}
   */
  const argv = minimist(process.argv.slice(2));

  /**
   * @type {Awaited<ReturnType<typeof askUser>>}
   */
  const options = argv.template
    ? {
        targetDir: argv._[0] ?? DEFAULT_TARGET_DIR,
        template: argv.template
      }
    : await askUser(DEFAULT_TARGET_DIR);

  const CWD = process.cwd();
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

  const templatePath = path.resolve(__dirname, `template-${options.template}`);

  if (!fs.existsSync(templatePath)) {
    exitOnMissingTemplate(options.template);
  }

  const targetDirPath = path.resolve(CWD, options.targetDir);

  if (options.targetDir !== '.') {
    fs.mkdirSync(targetDirPath);
  }

  fs.cpSync(templatePath, targetDirPath, { recursive: true });

  console.log("✅ You're ready to goo :)");
  console.log(`✅ cd ${options.targetDir} && echo "📘 Read the README.md :D"`);
} catch (error) {
  exitOnError(error);
}

