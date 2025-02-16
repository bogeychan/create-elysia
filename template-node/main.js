const { Elysia } = require("elysia");
const { node } = require("@elysiajs/node");

new Elysia({ adapter: node() })
  .get("/", () => ({ hello: "Node.js👋" }))
  .listen(3000);

console.log(`Listening on http://localhost:3000`);
