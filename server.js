const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const { readFileSync } = require("fs");
const { createServer } = require("https");
const { createRequestHandler } = require("@remix-run/express");

async function runServer() {
  let app = express();

  app.disable("x-powered-by");

  app.use(compression());

  app.use(
    "/build",
    express.static("public/build", { immutable: true, maxAge: "1y" })
  );

  app.use(express.static("public", { maxAge: "1h" }));

  app.use(morgan("tiny"));
  app.all(
    "*",
    createRequestHandler({ build: require("./build"), mode: "production" })
  );

  const httpsOptions = {
    key: readFileSync("/etc/letsencrypt/live/tormen.xyz/privkey.pem"),
    cert: readFileSync("/etc/letsencrypt/live/tormen.xyz/fullchain.pem"),
  };

  createServer(httpsOptions, app).listen(443, () => {
    console.log(`Server listening on port ${443}`);
  });
}

runServer();
