#! /usr/bin/env deno run --allow-net --unstable

import { app } from "./app.ts";

async function main() {
  console.log("listening on port 8080");
  await app().listen({ port: 8080 });
}
main();
