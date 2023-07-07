import { Application, Router, Status } from "../../deps.ts";
import * as middleware from "./middleware.ts";
import * as routes from "./routes.tsx";

export function app() {
  const router = new Router()
    .get(routes.Routes.HEALTH, ctx => {
      ctx.response.status = Status.OK;
    });    
  const app = new Application()
    .use(router.allowedMethods())
    .use(middleware.logger)
    .use(middleware.timing)
    .use(middleware.fs_route)
    .use(router.routes());
  app.addEventListener("error", (event: ErrorEvent) => {
    console.error(event.error);
  });
  return app;
}
