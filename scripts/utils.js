import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(
  path.dirname(url.fileURLToPath(import.meta.url))
);

/**
 * @param {any} error
 */
export function exitOnError(error) {
  //   logUsage();
  console.error(`❌ Something went wrong :(\n\n`, error);
  process.exit(1);
}

/**
 * @param {Template} template
 */
export function resolveTemplatePath(template) {
  return path.resolve(__dirname, `template-${template}`);
}

/**
 * @param {Options} options
 * @returns {string[]}
 */
export function getCommandsFor({ targetDir, template }) {
  const commands = [];

  if (targetDir !== '.') {
    commands.push(`cd ${targetDir}/`);
  }

  switch (template) {
    case 'bun':
      commands.push('bun install', 'bun run main.ts');
      break;

    case 'deno':
      commands.push('deno task start');
      break;

    case 'node':
      commands.push('npm i', 'npm start');
      break;

    case 'node-ts':
      commands.push('npm i', 'npm start');
      break;
  }

  return commands;
}

const PLACEHOLDER_FILES = ['package.json', 'README.md'];

/**
 * @param {string} dirPath
 * @param {Record<string, string>} replacements
 */
export function fillPlaceholders(dirPath, replacements) {
  const packageJsonPath = path.join(dirPath, 'package.json');
  fs.existsSync(packageJsonPath);

  for (const placeholderFile of PLACEHOLDER_FILES) {
    const filePath = path.join(dirPath, placeholderFile);

    if (!fs.existsSync(filePath)) {
      continue;
    }

    let file = fs.readFileSync(filePath, { encoding: 'utf8' });

    for (const placeholder in replacements) {
      file = file.replaceAll(placeholder, replacements[placeholder]);
    }

    fs.writeFileSync(filePath, file);
  }
}

