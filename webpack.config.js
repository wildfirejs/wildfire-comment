const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const path = require('path')
const fs = require('fs')

const copyright = function () {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json')))
  const name = packageJson.name ? packageJson.name : ''
  const version = packageJson.version ? packageJson.version : ''
  const description = packageJson.description ? packageJson.description : ''
  const homepage = packageJson.homepage ? packageJson.homepage : ''
  const fromYear = 2017
  const currentYear = new Date().getFullYear()
  const author = 'LahK'

  return `  [filebase]

  ${name}@${version}
  Copyright (C) ${currentYear == fromYear ? fromYear : fromYear + '-' + currentYear} ${author}
  ${description}

  You can get more infomation from ${homepage}

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.`
}

let webpackConfig = {
  entry: {
    app: './index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'wildfire-comment.min.js'
  },
  devtool: '#source-map',
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_console: true
        },
        warnings: false,
        sourceMap: true
      }
    }),
    new webpack.BannerPlugin({
      banner: copyright(),
    })
  ]
}

const CompressionWebpackPlugin = require('compression-webpack-plugin')

webpackConfig.plugins.push(
  new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
      '\\.js$'
    ),
    threshold: 10240,
    minRatio: 0.8
  })
)

module.exports = webpackConfig
