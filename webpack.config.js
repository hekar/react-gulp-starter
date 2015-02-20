/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpak-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */

var webpack = require('webpack'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  cache: true,
  debug: true,
  devtool: "sourcemap",
  context: __dirname + '/src',
  output: {
    path: "./build/js/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },
  entry: {
    app: "./js/App.js"
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],
    loaders: [{
      test: /\.jsx$/,
      loader: 'jsx'
    },{
      test: /\.css$/,
      loader: 'style!css'
    },{
      test: /\.gif/,
      loader: 'url-loader?limit=10000&minetype=image/gif'
    },{
      test: /\.jpg/,
      loader: 'url-loader?limit=10000&minetype=image/jpg'
    },{
      test: /\.png/,
      loader: 'url-loader?limit=10000&minetype=image/png'
    },{
      test: /\.jsx$/,
      loader: 'jsx-loader'
    }
  ]
  }
}
;
