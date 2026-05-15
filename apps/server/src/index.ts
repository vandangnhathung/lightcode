import { Hono } from "hono";
import { APP_NAME, greet } from "@lightcode/shared";

export const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: APP_NAME,
    runtime: "bun",
    message: greet("world").message,
  });
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

if (import.meta.main) {
  const port = Number(Bun.env.PORT ?? 3000);
  const server = Bun.serve({
    port,
    fetch: app.fetch,
  });

  console.log(`Hono server listening on ${server.url}`);
}

export type AppType = typeof app;
