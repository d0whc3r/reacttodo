var config = require('./webpack.config.babel');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

config.plugins.push(
  new BrowserSyncPlugin({
    host: 'localhost',
    port: process.env.PORT || 3000,
    server: {baseDir: ['public']}
  })
);

module.exports = config

