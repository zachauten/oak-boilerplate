import { Context, RouteParams, RouterContext, Status } from "../../deps.ts";
import * as queries from "./queries.ts";
import { InitialState } from "./models.ts";

export enum Routes {
  INDEX = "/",
  HEALTH = "/api/health",
  PEOPLE_NAME = "/api/people/:name",
}
type person_ctx = RouterContext<
  Routes.PEOPLE_NAME,
  RouteParams<Routes.PEOPLE_NAME>,
  InitialState
>;

export async function add_person(
  ctx: person_ctx,
) {
  if (ctx.params.name === undefined) {
    ctx.throw(Status.BadRequest);
  }
  const result = ctx.request.body({ type: "json" });
  // TODO: validate fields exist on body
  const body = await result.value;
  queries.add_person(
    ctx.state.db,
    { name: ctx.params.name, email: body.email, birth_year: body.year },
  );
}

export function get_people(ctx: person_ctx) {
  if (ctx.params.name === undefined) {
    ctx.throw(Status.BadRequest);
  }
  const people = queries.get_people(ctx.state.db, ctx.params.name);
  ctx.response.body = people;
}

import { React, ReactDomServer } from "../../deps.ts";
import App from "../client/app.tsx";

// For how to SSR: https://decipher.dev/deno-by-example/advanced-react-ssr/#add-react-server-render

const todos: Map<number, string> = new Map();

export function index(ctx: Context) {
  try {
    const body = ReactDomServer.renderToString(
      <App todos={Array.from(todos.values())} />,
    );
    ctx.response.body = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
  </head>
  <body >
    <div id="root">${body}</div>
  </body>
  </html>`;
  } catch (err) {
    console.error(err);
  }
}
