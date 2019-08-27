const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/search',
        {
            changeOrigin: true,
            target: 'https://unsplash.com/napi/search',
            pathRewrite: {
                '^/search' : '/'
            }
        }));
    app.use(proxy('/stats',
        {
            changeOrigin: true,
            target: 'https://unsplash.com/napi/photos',
            pathRewrite: {
                '^/stats' : '/'
            }
        }));
};