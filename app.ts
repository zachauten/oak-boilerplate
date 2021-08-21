import { Application, ApplicationOptions, Router } from "./deps.ts";
import { InitialState } from "./models.ts";
import * as middleware from "./middleware.ts";
import * as routes from "./routes.ts";

export function app(state: ApplicationOptions<InitialState>) {
  const router = new Router()
    .get("/", routes.index)
    .get("/people/:name", routes.get_people)
    .post("/people/:name", routes.add_person);
  const app = new Application<InitialState>(state)
    .use(router.routes())
    .use(router.allowedMethods())
    .use(middleware.logger)
    .use(middleware.timing);
  app.addEventListener("error", (event) => {
    console.error(event.error);
  });
  return app;
}
