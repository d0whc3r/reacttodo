var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');
var CopyWebpackPlugin = require('copy-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var vfile = 'app/config/' + process.env.NODE_ENV + '.env';
try {
  envFile(path.join(__dirname, vfile));
} catch (e) {
  console.log('[!] Error loading ENVFile: ' + vfile);
}

var outputdir = path.resolve(__dirname, 'public')

var config = {
  context: __dirname,
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  output: {
    path: outputdir,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      },
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
        GITHUB_TOKEN: JSON.stringify(process.env.GITHUB_TOKEN),
      }
    }),
    new CopyWebpackPlugin(
      [{
        from: 'node_modules/jquery/dist/jquery.min.js',
        to: 'jquery.min.js'
      }], {
        copyUnmodified: false
      })
  ],
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/api'
    ],
    alias: {
      app: 'app',
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};

module.exports = config;
