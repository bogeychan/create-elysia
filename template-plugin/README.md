# $PROJECT_NAME$

$PROJECT_NAME$ plugin for [Elysia.js](https://elysiajs.com)

## Installation

```bash
bun add $PROJECT_NAME$
```

## Usage

```ts
import { Elysia } from 'elysia';
import { myPlugin } from '$PROJECT_NAME$';

const app = new Elysia()
  .use(myPlugin())
  .get('/', (ctx) => {
    return ctx.getProjectName();
  })
  .listen(8080);

console.log(`Listening on http://${app.server!.hostname}:${app.server!.port}`);
```

Checkout the [examples](./examples) and [tests](./tests) folders on github.

## API

### Plugin Options

| Option | Description |
| ------ | ----------- |
| `...`  | ...         |

### `ctx.getProjectName()`

Returns the project name

```js
const projectName = ctx.getProjectName();
```

## License

[...](LICENSE)

