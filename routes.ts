import type { Context } from "./deps.ts";

export async function self(ctx: Context) {
  ctx.response.body = "Running!\n";
}
