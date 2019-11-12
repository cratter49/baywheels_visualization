const webpack = require('webpack');
const path = require('path');

const FlowWebpackPlugin = require('flow-webpack-plugin');

module.exports = {
    entry: {
      baywheels: './src/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.scss$|\.css$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          use: 'file-loader?name=fonts/[name].[ext]!static'
        },
        {
          test: /\.env$/,
          loader: "file-loader?name=index.[ext]",
          exclude: [/node_modules/]
        }
      ]
    },
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new FlowWebpackPlugin()
    ],
    devServer: {
      contentBase: './public',
      publicPath: '/',
      hot: true,
      historyApiFallback: true
    }
  };