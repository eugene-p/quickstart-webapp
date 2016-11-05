var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {
  env: 'dev',
  contentBase: './app',
  entry: './app/index.js',
  output: {
    path: './build',
    filename: '/js/[hash]_bundle.js'
  },
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
      test: /\.html$/,
      loader: "ejs-loader"
    }]
  }
};

module.exports =  {
  base: webpackConfig,
  dev: {
    plugins: [
      new CleanWebpackPlugin(['build']),
      new HtmlWebpackPlugin({
        title: "Super Cool App",
        env: "dev",
        template: "./app/views/index.html",
        favicon: "./app/assets/images/icons/favicon-512x512.png",
        inject: true
      }),
      new ExtractTextPlugin("[name]-[hash].css")
    ]
  },
  prod: {
    plugins: [
      new CleanWebpackPlugin(['build']),
      new HtmlWebpackPlugin({
        title: "Super Cool App",
        env: "prod",
        template: "./app/views/index.html",
        favicon: "./app/assets/images/icons/favicon-512x512.png",
        inject: true
      }),
      new ExtractTextPlugin("[name]-[hash].css")
    ]
  }
};
