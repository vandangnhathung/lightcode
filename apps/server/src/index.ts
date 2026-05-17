import { app } from "./app.ts";

const port = Number(Bun.env.PORT ?? 3000);

try {
  const server = Bun.serve({
    port,
    fetch: app.fetch,
  });

  console.log(`Hono server listening on ${server.url}`);
} catch (error) {
  if (error instanceof Error && "code" in error && error.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Run with another port, e.g. PORT=${port + 1} bun run dev:server`,
    );
    process.exit(1);
  }

  throw error;
}
