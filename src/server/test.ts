import { app } from "./app.ts";
import { assertEquals } from "../../deps.ts";

Deno.test("/api", async () => {
  const application = app();
  const controller = new AbortController();
  const { signal } = controller;
  const listen_promise = application.listen({ port: 8080, signal });

  const res = await fetch("http://localhost:8080/api/health");
  assertEquals(res.status, 200);
  const body = await res.text();
  assertEquals(body, "");

  controller.abort();
  await listen_promise;
});
