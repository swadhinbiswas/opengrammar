import app from './src/index.ts';

const port = process.env.PORT || 8787;

console.log(`\n🪶 OpenGrammar Backend starting on http://localhost:${port} (Bun)\n`);

const server = Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`✅ Server ready on ${server.url}`);
