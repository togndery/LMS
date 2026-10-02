const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // API Proxy
    server.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:8000",
        changeOrigin: true,
        pathRewrite: (path) => {
          console.log("Proxy path:", path);
          return `/api${path}`;
        },
      }),
    );

    // Next.js
    server.use((req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;

      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });
