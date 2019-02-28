// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { parse } = require("url");
const next = require("next");
const compression = require("compression");
const express = require("express");
const httpProxy = require("http-proxy");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
var proxy = httpProxy.createProxyServer({});
app.prepare().then(() => {
  const server = express();
  server.use(compression());
  server.post("/antvip/ant-cgi/*", (req, res) => {
    console.log("client ip POST:" + req.url);
    return proxy.web(req, res, { target: "http://114.116.119.166" });
  });
  server.get("*", (req, res) => {
    if (req.cookies && req.cookies.jeesitesessionid) {
      res.cookie("jeesitesessionid", req.cookies.jeesitesessionid);
    }
    if (req.cookies && req.cookies.token) {
      res.cookie("token", req.cookies.token);
    }
    return handle(req, res);
  });
  let port = process.env.PORT || 8888;

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  }
});
