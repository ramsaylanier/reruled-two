const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/index.js')
  ],
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new WriteFilePlugin(),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: './src/assets',
        to: './assets' }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.json?$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      }, {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass?sourceMap',
          'postcss-loader'
        ]
      }
    ]
  }
}
