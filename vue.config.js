const path = require('path')
const ele = require('./data.json')
const { seller, goods, ratings } = ele

module.exports = {
    configureWebpack: {
        devServer: {
            before: function(app, server) {
                app.get('/api/seller', function(req, res) {
                    res.json(seller);
                });
                app.get('/api/goods', function(req, res) {
                    res.json(goods);
                });
                app.get('/api/ratings', function(req, res) {
                    res.json(ratings);
                });
            }
        }
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, './src/scss/*.scss')
            ]
        }
    }
}