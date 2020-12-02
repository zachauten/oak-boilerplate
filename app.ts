import { Application, Router } from "./deps.ts";
import { initial_state, InitialState } from "./models.ts";
import * as middleware from "./middleware.ts";
import * as routes from "./routes.ts";

export function app() {
  const router = new Router()
    .get("/self", routes.self);
  const app = new Application<InitialState>(initial_state)
    .use(router.routes())
    .use(router.allowedMethods())
    .use(middleware.logger)
    .use(middleware.timing);
  app.addEventListener("error", (event) => {
    console.error(event.error);
  });
  return app;
}
