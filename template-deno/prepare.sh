#!/bin/bash

# Cleanup
rm -fr node_modules deno.lock

echo "Downloading..."

# Try to run (this shall fail & create a `node_modules` folder)
deno run --reload=npm:@bogeychan/elysia-polyfills --node-modules-dir deps.ts &> /dev/null

# Transpile a few `node_modules` packages to conform ESM
./node_modules/@bogeychan/elysia-polyfills/bin/cli.js