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
        title: 'Node.js',
        value: 'node-ts'
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

/**
 * @param {string} defaultTargetDir
 * @returns {Promise<Options>}
 */
export function promptOptions(defaultTargetDir) {
  return prompts([
    PROJECT_NAME(defaultTargetDir),
    TEMPLATES('Select a template')
  ]);
}

/**
 * @param {string} defaultTargetDir
 */
export async function promptOnMissingTargetDir(defaultTargetDir) {
  return (await prompts([PROJECT_NAME(defaultTargetDir)])).targetDir;
}

/**
 * @param {string} template
 */
export async function promptOnInvalidTemplate(template) {
  return (
    await prompts([
      TEMPLATES(
        `"${template}" isn't a valid template. Please choose from below`
      )
    ])
  ).template;
}
