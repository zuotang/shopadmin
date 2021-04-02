const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://shop.local.com:80/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/", // rewrite path
      },
    })
  );
};
