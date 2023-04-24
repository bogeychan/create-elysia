import prompts from 'prompts';

/**
 * @param {string} defaultTargetDir
 */
export async function askUser(defaultTargetDir) {
  return await prompts([
    {
      type: 'text',
      name: 'targetDir',
      message: 'Project Name:',
      initial: defaultTargetDir
    },
    {
      type: 'select',
      name: 'template',
      message: 'Select a template',
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
    }
  ]);
}
