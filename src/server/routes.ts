import { RouterContext, Status } from "../../deps.ts";
import * as queries from "./queries.ts";

export async function index(ctx: RouterContext) {
  ctx.response.body = "Running!\n";
}

export async function add_person(ctx: RouterContext) {
  if (ctx.params.name === undefined) {
    ctx.throw(Status.BadRequest);
  }
  const result = ctx.request.body({ type: "json" });
  // TODO: validate fields exist on body
  const body = await result.value;
  queries.add_person(
    ctx.state.db, 
    { name: ctx.params.name, email: body.email, birth_year: body.year }
  );
}

export async function get_people(ctx: RouterContext) {
  if (ctx.params.name === undefined) {
    ctx.throw(Status.BadRequest);
  }
  const people = queries.get_people(ctx.state.db, ctx.params.name);
  ctx.response.body = {
    people: people.map(p => {
      return {
        ...p,
        links: {
          delete: `/people/${p.id}`
        }
      }
    })
  };
}
