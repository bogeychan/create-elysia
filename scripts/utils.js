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
      commands.push('bun i', 'bun run main.ts');
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

    case 'plugin':
      commands.push('bun i', 'bun run dev');
      break;
  }

  return commands;
}

const CONFIG_FILE = 'scaffolding.json';
const PLACEHOLDER_FILES = ['package.json', 'README.md'];

/**
 * @typedef ScaffoldingConfig
 *
 * @type {object}
 *
 * @property {string[]} [placeholderEntries]
 * @property {string[]} [ignoreEntries]
 */

/**
 * @param {string} dirPath
 * @param {Record<string, string>} replacements
 * @param {ScaffoldingConfig} config
 */
export function fillPlaceholders(dirPath, replacements, config) {
  const placeholderFiles = config.placeholderEntries
    ? [...PLACEHOLDER_FILES, ...config.placeholderEntries]
    : PLACEHOLDER_FILES;

  for (const placeholderFile of placeholderFiles) {
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

const IGNORE_FILES = ['gitignore', 'npmignore'];

/**
 * @param {string} dirPath
 * @param {ScaffoldingConfig} config
 */
export function renameIgnoreFiles(dirPath, config) {
  const gitignoreFiles = config.ignoreEntries
    ? [...IGNORE_FILES, ...config.ignoreEntries]
    : IGNORE_FILES;

  for (const gitignoreFile of gitignoreFiles) {
    const fileName = path.basename(gitignoreFile);
    const filePath = path.join(dirPath, gitignoreFile);

    if (!fs.existsSync(filePath)) {
      continue;
    }

    const newFilePath = path.join(path.dirname(filePath), `.${fileName}`);
    fs.renameSync(filePath, newFilePath);
  }
}

/**
 * @param {string} dirPath
 * @returns {ScaffoldingConfig}
 */
export function readScaffoldingConfigOnce(dirPath) {
  let config = {};

  const filePath = path.join(dirPath, CONFIG_FILE);

  try {
    config = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  } catch (e) {
    // ignored
  } finally {
    fs.rmSync(filePath, { force: true });
  }

  return config;
}

