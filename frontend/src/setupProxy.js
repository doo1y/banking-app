const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api/v1/auth",
        createProxyMiddleware({
            target: "http://localhost:8081",
            changeOrigin: true,
        })
    );
    app.use(
        "/api/v1",
        createProxyMiddleware({
            target: "http://localhost:8082",
            changeOrigin: true,
        })
    );
};
