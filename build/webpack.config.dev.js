/**
 * webpack config
 *
 * Authors: axin
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const { assetsDir, baseConfig } = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SERVER_PORT = 9090

const config = merge.smart(baseConfig, {
  devtool: 'source-map',
  output: {
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true // 开启热重载
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    'browsers': [ '> 1%', 'last 3 versions', 'ie >= 9' ]
                  }),
                  require('cssnano')
                ]
              }
            }
          ],
          fallback: ['vue-style-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    'browsers': [ '> 1%', 'last 3 versions', 'ie >= 9' ]
                  }),
                  require('cssnano')
                ]
              }
            }
          ],
          fallback: ['vue-style-loader']
        })
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: assetsDir,
    publicPath: baseConfig.output.publicPath,
    port: SERVER_PORT,
    noInfo: false,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      // '/pc': {
      //   target: 'http://www.baidu.com/',
      //   changeOrigin: true // 代理为域名时必须指定为true
      // }
    },
    progress: false,
    quiet: false,
    stats: {
      colors: true
    },
    clientLogLevel: 'none'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'js/[name].js' }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
})

module.exports = config
