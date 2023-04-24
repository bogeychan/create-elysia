import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => ({ hello: 'Bun👋' })).listen(8080);

console.log(`Listening on http://localhost:${app.server!.port}`);
