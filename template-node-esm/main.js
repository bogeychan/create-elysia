import '@bogeychan/elysia-polyfills/node/index.js';
import { Elysia } from 'elysia';

const app = new Elysia()
    .get('/', () => ({ hello: 'Node.js👋' }))
    .listen(8080);

console.log(
    `🦊 Elysia is running at http://localhost:${app.server?.port}`
);
