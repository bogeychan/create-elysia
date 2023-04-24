#!/usr/bin/env node

// CLI ARGS -> create-elysia <package-name> <template-id>
const packageName = process.argv[2] ?? 'elysia-project';
const tempalteId = process.argv[3];

import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

function logUsage() {
  console.log(
    `
📘📘📘📘📘📘📘📘📘📘📘📘 USAGE 📘📘📘📘📘📘📘📘📘📘📘📘
📘
📘 Command:
📘\t"create-elysia <package-name> <template-id>"
📘
📘 Arguments:
📘\tpackage-name = string
📘\ttemplate-id  = "bun" | "deno" | "node-ts"
📘
📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘
`
  );
}

if (!packageName || !tempalteId) {
  logUsage();
  process.exit(2);
}

/**
 * @param {any} error
 */
function exitOnError(error) {
  logUsage();
  console.error(`❌ Something went wrong :(\n\n`, error);
  process.exit(1);
}

function exitOnMissingTemplate() {
  logUsage();
  console.error(`❌ Template "${tempalteId}" doesn't exist :(`);
  process.exit(1);
}

try {
  const CWD = process.cwd();
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

  const templatePath = path.resolve(__dirname, `template-${tempalteId}`);

  if (!fs.existsSync(templatePath)) {
    exitOnMissingTemplate();
  }

  const packagePath = path.resolve(CWD, packageName);

  fs.mkdirSync(packagePath);

  fs.cpSync(templatePath, packagePath, { recursive: true });

  console.log("✅ You're ready to goo :)");
  console.log(`✅ cd ${packageName} && echo "📘 Read the README.md :D"`);
} catch (error) {
  exitOnError(error);
}

