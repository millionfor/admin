/**
 * webpack config
 *
 * Authors: axin
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const { baseConfig } = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = merge.smart(baseConfig, {
  devtool: 'inline-source-map',
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
  externals: '',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
})

module.exports = config
