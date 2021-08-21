import { app } from "./app.ts";
import { assert, DB } from "./deps.ts";

Deno.test("/self", async function () {
  const initial_state = {
    state: {
      db: new DB(),
    },
  };
  let application = app(initial_state);
  const controller = new AbortController();
  const { signal } = controller;
  const listen_promise = application.listen({ port: 8080, signal });

  let res = await fetch("http://localhost:8080/self");
  assert(res.status === 200);
  let body = await res.text();
  assert(body === "Running!\n");

  controller.abort();
  await listen_promise;
});
