require('@bogeychan/elysia-polyfills/node/index.js');

const { Elysia } = require('elysia');

const app = new Elysia().get('/', () => ({ hello: 'Node.js👋' })).listen(8080);

console.log(`Listening on http://localhost:${app.server?.port}`);

