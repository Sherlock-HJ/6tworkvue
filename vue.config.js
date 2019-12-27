module.exports = {
    publicPath: '',
    productionSourceMap: false,
    outputDir: 'dist',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://manager.m.xilu.com',
                ws: true,
                changeOrigin: true
            }
        }
        // ,disableHostCheck: true

    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
};
