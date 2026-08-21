import serverless from "serverless-http";
import app, { ensureDbConnected } from "../../src/app.js";

// Classic (v1) Netlify Functions handler. serverless-http translates the
// AWS Lambda-style (event, context) signature into an Express request —
// it does NOT understand the newer Fetch-API (Request, context) signature
// used by Netlify's v2 functions. Routing here is handled by the
// [[redirects]] rule in netlify.toml (/api/* -> /.netlify/functions/api/:splat),
// so no `config.path` export is needed or wanted.
const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  await ensureDbConnected();
  return serverlessHandler(event, context);
};
