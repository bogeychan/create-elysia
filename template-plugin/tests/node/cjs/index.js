if ('Bun' in globalThis) {
  throw new Error('❌ Use Node.js to run this test!');
}

const { myPlugin } = require('$PROJECT_NAME$');

if (typeof myPlugin !== 'function') {
  throw new Error('❌ CommonJS Node.js failed');
}

console.log('✅ CommonJS Node.js works!');
