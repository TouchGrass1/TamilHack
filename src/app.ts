/**
 * Hono app wrapper — shuttles the raw Request into the runtime-agnostic
 * handler. The identical handler runs on Supabase Edge Functions (Deno).
 */

import { Hono } from "hono";
import { handleHttpRequest } from "./core/http.ts";

export function createApp(): Hono {
  const app = new Hono();
  app.all("*", (c) => handleHttpRequest(c.req.raw));
  return app;
}
