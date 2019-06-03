
const webpack = require('webpack')
const merge = require('webpack-merge')
const { assetsDir, baseConfig } = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressPlugin = require('@fedor/progress-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const getEnv = require('env-parse').getEnv

const config = merge.smart(baseConfig, {
  devtool: 'eval-source-map',
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
            },
            'sass-loader'
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
    port: getEnv('DEV_PORT', 9090),
    host: getEnv('DEV_HOST', 'localhost'),
    noInfo: false,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/syApi': {
        target: getEnv('API_BASE', 'http://local.dev:8080/backend'),
        changeOrigin: true
      }
    },
    progress: false,
    quiet: false,
    stats: {
      colors: true
    },
    clientLogLevel: 'none'
  },
  plugins: [
    new ProgressPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'js/[name].js' }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
})

module.exports = config
