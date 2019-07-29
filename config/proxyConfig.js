module.exports = {
    proxy: {
        '/apis': {
            target: 'http://localhost:63844/',
            changeOrigin: true,
            pathRewrite: {
                '^/apis': ''
            }
        }
    }
}
