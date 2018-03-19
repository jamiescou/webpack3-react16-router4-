const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')],
    vendor: ['react', 'react-dom', 'babel-polyfill'],
  }, // 指定入口文件，程序从这里开始编译,__dirname当前目录, ../表示上一级目录, ./同级目录
  resolve: { // 指定第三方库目录，减少webpack寻找时间
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出的路径
    filename: 'app/[name]_[hash:8].js', // 打包后文件
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader', // 加载器
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|ogg|mp3)$/,
        loader: 'url-loader?limit=1&name=[sha512:hash:base64:7].[ext]',
      },
      {
        test: /\.(ttf|eot|woff(?:2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, { // for svg
        test: /\.(svg?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=100000000',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ],
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:9090' }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
  ],
};
