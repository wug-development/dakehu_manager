module.exports = {
    proxy: {
        '/apis': {
            target: 'http://localhost:63844/',
            changeOrigin: true,
            pathRewrite: {
                '^/apis': ''
            }
        },
        '/apibook': {
            target: 'http://api.51book.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/apibook': ''
            }
        }
    }
}
