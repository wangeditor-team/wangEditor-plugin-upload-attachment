const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { distPath, examplePath } = require('./paths.js')

module.exports = merge(webpackCommonConf, {
  mode: 'development',
  entry: path.join(examplePath, 'index'),
  devServer: {
    port: 8000,
    progress: true, // 显示打包的进度条
    contentBase: distPath, // 根目录
    // open: true,  // 自动打开浏览器
    compress: true, // 启动 gzip 压缩
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(examplePath, 'index.html'),
      filename: 'index.html',
    }),
  ],
})
