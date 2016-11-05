var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpackConfig = {
  contentBase: './app',
  entry: './app/index.js',
  output: {
    path: './build',
    filename: '/js/[hash]_bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: "./app/views/index.html",
      favicon: "./app/assets/images/icons/favicon-512x512.png"
    }),
    new ExtractTextPlugin("[name]-[hash].css")
  ],
  module: {
    loaders: [{
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules|build/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        "url-loader?limit=10000&name=/img/img-[hash:6].[ext]",
        'image-webpack?optimizationLevel=7&interlaced=false',
      ]
    }, {
      test: /\.ejs$/,
      loader: "ejs-loader",
      query: {
        'variable': 'data'
      }
    }, {
      test: /\.html$/,
      loader: "html-loader"
    }]
  }
};

module.exports = webpackConfig;
