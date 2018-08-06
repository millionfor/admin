/**
 * webpack config
 *
 * Authors: axin
 */

const path = require('path')
const glob = require('globby')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExtPlugin = require('html-webpack-ext-plugin')
const isProduction = process.env.NODE_ENV !== 'development'

const assetsDir = resolve('src')
const distDir = resolve('dist')
const viewDir = resolve('src/view')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function moduleName (modules) {
  let filename = path.basename(modules)
  let parts = filename.split('.')
  parts.pop()
  filename = parts.join('.')
  return path.dirname(modules) + '/' + filename
}

const jsEntry = (() => {
  const obj = {}
  const files = glob.sync(['js/conf/*/!(_*).js'], { cwd: assetsDir })
  files.forEach(val => {
    let parts = val.split(/[\\/]/)
    parts.shift()
    parts.shift()
    let modules = parts.join('/')
    let entry = moduleName(modules)
    obj[entry] = val
  })
  return obj
})()

const minifierConfig = isProduction ? {
  removeComments: true,
  removeCommentsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  minifyJS: true,
  removeScriptTypeAttributes: true,
  maxLineLength: 1024
} : false

const getPageEntry = view => jsEntry[view] ? view : ''

const pages = glob.sync(['*/!(_*).html'], { cwd: viewDir }).map(p => {
  let entry = getPageEntry(p.replace('.html', ''))
  let chunks = ['common']
  if (entry) {
    chunks.push(entry)
  }
  return new HtmlWebpackPlugin({
    filename: path.join('view', p),
    template: `html-loader?min=false!src/view/${p}`,
    cache: true,
    inject: true,
    chunks: chunks,
    minify: minifierConfig
  })
})

const baseConfig = {
  entry: jsEntry,
  output: {
    path: distDir,
    publicPath: '/',
    filename: 'js/[name].[chunkhash:7].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheIdentifier: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          publicPath: distDir,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          publicPath: distDir,
          name: 'font/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    modules: [
      resolve('node_modules'),
      resolve('src'),
      resolve('src/js')
    ],
    alias: {
      '@': resolve('src')
    },
    extensions: ['.js', 'json', '.vue', '.scss']
  },
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'jquery': '$',
    'lodash': '_'
  },
  plugins: [
    new webpack.ProvidePlugin({ vue: 'Vue', _: 'lodash' }),
    new HtmlWebpackExtPlugin({ cache: true, delimiter: '$', locals: {} }),
    ...pages
  ]
}

module.exports = {
  isProduction,
  assetsDir,
  distDir,
  baseConfig
}
