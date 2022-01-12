const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://' + process.env.API_HOST + ':' + process.env.API_PORT;

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target,
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        })
    );
};
