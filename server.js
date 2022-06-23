const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const { readFileSync } = require("fs");
const { createServer } = require("https");
const { createServer: createHttpServer } = require("http");
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

  const server = createServer(httpsOptions, app).listen(443, () => {
    console.log(`Server listening on port ${443}`);
  });

  ["SIGTERM", "SIGINT"].forEach((signal) => {
    process.once(signal, () => server?.close(console.error));
  });

  let httpApp = express();

  httpApp.use(function (request, response) {
    return response.redirect("https://" + request.headers.host + request.url);
  });

  httpApp.listen(80, () => {
    console.log(`HTTP app listening on port ${80}`);
  });
}

runServer();
