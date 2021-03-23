const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost", //"http://www.storm-money.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/", // rewrite path
      },
    })
  );
};
