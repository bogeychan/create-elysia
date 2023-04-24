import { Elysia } from './deps.ts';

const app = new Elysia().get('/', () => ({ hello: 'Deno👋' })).listen(8080);

console.log(`Listening on http://localhost:${app.server!.port}`);

