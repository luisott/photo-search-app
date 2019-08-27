const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/photos',
        {
            changeOrigin: true,
            target: 'https://unsplash.com/napi/search'
        }));
};