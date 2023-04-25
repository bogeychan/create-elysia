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
      commands.push('./prepare.sh', 'deno task start');
      break;

    case 'node-ts':
      commands.push('./prepare.sh', 'npm start');
      break;
  }

  return commands;
}
