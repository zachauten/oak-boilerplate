#! /usr/bin/env deno run --allow-net --allow-read --allow-write --allow-env

import { app } from "./src/server/app.ts";
import { DB } from "./deps.ts";
import { setup } from "./src/server/queries.ts";

export const port = parseInt(Deno.env.get("PORT")!) || 8080;

async function main() {
  const db = "oak.db";
  const initial_state = {
    state: {
      db: new DB(db),
    },
  };
  const oak = app(initial_state);
  try {
    setup(oak.state.db);
  } catch (err) {
    console.error(err);
  }
  const controller = new AbortController();
  console.log(`listening on port ${port}`);
  const listen = oak.listen({ port: port });
  controller.abort();
  await listen;
  console.log(`Closing connection to ${db}`);
  oak.state.sqlite.close();
}
await main();
