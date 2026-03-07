import { serve } from '@hono/node-server';
import app from './src/index.js';

const port = 8787;

console.log(`Starting OpenGrammar backend on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
