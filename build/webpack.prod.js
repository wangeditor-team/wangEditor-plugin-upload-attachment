const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackCommonConf = require('./webpack.common.js')
const { distPath, srcPath } = require('./paths.js')

// 包体积分析
const isAnalyzer = process.env.NODE_ENV === 'production_analyzer'

// webpack plugins
const plugins = [
  new webpack.DefinePlugin({
    ENV: JSON.stringify('production'),
  }),
  new CleanWebpackPlugin(),
]
if (isAnalyzer) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  entry: path.join(srcPath, 'index'),
  output: {
    filename: 'index.js',
    path: distPath,
    library: {
      name: 'WangEditorPluginUploadAttachment',
      type: 'umd',
    },
  },
  externals: {
    // 这里的 value 需要跟 @wangeditor/editor 定义的 umd name 对应上，否则在 windows 就会找不到对应的对象
    // 具体值参考如下链接 https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/editor/rollup.config.js
    '@wangeditor/core': 'WangEditorCore',
    '@wangeditor/editor': 'wangEditor',
  },
  plugins,
  devtool: 'source-map',
})
