# create-elysia

## Scaffolding Your First [Elysia.js](https://elysiajs.com) Project

With NPM:

```bash
npm create elysia@latest
```

With Yarn:

```bash
yarn create elysia
```

With PNPM:

```bash
pnpm create elysia
```

With Deno:

```bash
deno run -r=npm:create-elysia --allow-read --allow-write npm:create-elysia
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line arguments. For example, to scaffold a `Bun` project, run:

```bash
yarn create elysia my-elysia-app --template bun
```

Currently supported template presets include:

- `bun`
- `deno`
- `node-ts`

You can use . for the project name to scaffold in the current directory.

## Credits ❤️

This project was inspired by [create-vite](https://www.npmjs.com/package/create-vite)

## Author

[bogeychan](https://github.com/bogeychan)

## License

[MIT](LICENSE)