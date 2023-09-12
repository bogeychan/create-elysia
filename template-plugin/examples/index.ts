import { Elysia } from 'elysia';
import { myPlugin } from '../src';

const app = new Elysia()
  .use(myPlugin())
  .get('/', ({ getProjectName }) => getProjectName())
  .listen(8080);

console.log(`Listening on http://${app.server!.hostname}:${app.server!.port}`);
