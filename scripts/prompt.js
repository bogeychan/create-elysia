/// <reference path="../types.d.ts" />

import prompts from 'prompts';

/**
 * @param {string} message
 * @returns {prompts.PromptObject<"template">}
 */
function TEMPLATES(message) {
  return {
    type: 'select',
    name: 'template',
    message,
    choices: [
      {
        title: 'Bun',
        value: 'bun'
      },
      {
        title: 'Deno',
        value: 'deno'
      },
      {
        title: 'Node.js - Typescript/ESM',
        value: 'node-ts'
      },
      {
        title: 'Node.js - CommonJS',
        value: 'node'
      }
    ]
  };
}

/**
 * @param {string} defaultTargetDir
 *  @returns {prompts.PromptObject<"targetDir">}
 */
function PROJECT_NAME(defaultTargetDir) {
  return {
    type: 'text',
    name: 'targetDir',
    message: 'Project Name:',
    initial: defaultTargetDir
  };
}

const onCancel = () => process.exit(0);

/**
 * @param {string} defaultTargetDir
 * @returns {Promise<Options>}
 */
export function promptOptions(defaultTargetDir) {
  return prompts(
    [PROJECT_NAME(defaultTargetDir), TEMPLATES('Select a template')],
    { onCancel }
  );
}

/**
 * @param {string} defaultTargetDir
 */
export async function promptOnMissingTargetDir(defaultTargetDir) {
  return (await prompts([PROJECT_NAME(defaultTargetDir)], { onCancel }))
    .targetDir;
}

/**
 * @param {string} template
 */
export async function promptOnInvalidTemplate(template) {
  return (
    await prompts(
      [
        TEMPLATES(
          `"${template}" isn't a valid template. Please choose from below`
        )
      ],
      { onCancel }
    )
  ).template;
}

