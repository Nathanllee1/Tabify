const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/**",
    createProxyMiddleware({
      target: "http://localhost:3000",
    })
  );
  app.use(
    "/api/**",
    createProxyMiddleware({
      target: "http://localhost:3000",
    })
  );
};
