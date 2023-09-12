import { Elysia } from 'elysia';
import { myPlugin } from '../src';

import { describe, expect, it } from 'bun:test';

const req = (path: string) => new Request(`http://localhost${path}`);

describe('$PROJECT_NAME$', () => {
  it('getProjectName should return $PROJECT_NAME$', async () => {
    const app = new Elysia()
      .use(myPlugin())
      .get('/', ({ getProjectName }) => getProjectName());

    const res = await app.handle(req('/'));
    expect(await res.text()).toBe('$PROJECT_NAME$');
  });
});
