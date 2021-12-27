const path = require('path')
// const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          host: process.env.HOST || 'localhost',
          port: process.env.PORT || 9000,
        },
      }
const esLintPlugin = (isDev) =>
  isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })]

const mapLoader = (isDev) =>
  !isDev
    ? []
    : [
        {
          enforce: 'pre',
          test: /\.[tj]s$/,
          use: ['source-map-loader'],
        },
      ]

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,

  entry: path.resolve(__dirname, './src/index'),

  stats: {
    children: true,
    errorDetails: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dest'),
    assetModuleFilename: development
      ? 'assets/[name][ext]'
      : 'assets/[hash][ext]',
  },
  ...devServer(development),

  module: {
    rules: [
      ...mapLoader(development),
      {
        test: /\.[t]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    // new CopyPlugin({
    //   patterns: [{ from: 'src/assets/', to: 'assets/' }],
    // }),
    //...esLintPlugin(development),
    //new ESLintPlugin({ extensions: ['ts'] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
})
