import { Hono } from "hono";
import { APP_NAME, greet } from "@lightcode/shared";

const routes = new Hono()
  .get("/", (c) =>
    c.json({
      name: APP_NAME,
      runtime: "bun",
      message: greet("world").message,
    }),
  )
  .get("/health", (c) => c.json({ status: "ok" as const }));

export const app = routes;
export type AppType = typeof routes;
