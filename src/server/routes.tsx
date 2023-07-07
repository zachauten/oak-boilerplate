import { RouterContext, Status } from "../../deps.ts";

export enum Routes {
  HEALTH = "/api/health",
  EXAMPLE = "/api/example",
}

export function add_person(
  ctx: RouterContext<Routes.EXAMPLE>,
) {
  ctx.response.status = Status.OK;
}
