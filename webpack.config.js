const path = require('path');
const webpack = require('webpack');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const extractText = new extractTextWebpackPlugin('[hash]-[name].css');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const lessRules = {
  use: [
    {
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
    }
  ]
}
const { DefinePlugin } = webpack;
const ENV = process.env.NODE_ENV;
if (ENV === 'development') {
  console.warn('这个警告会在生产环境消失');
}
module.exports = {
  entry: {
    // main: './index.js',
    home: './pages/home/index.js',
    about: './pages/about/index.js',
  },
  output: {
    filename: '[hash]-[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractText.extract(lessRules),
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // webapck的splitChunks默认只对按需加载的模块起作用,可通过改变该属性修改默认行为，
      // 可选的值：'async': 异步，即按需加载的模块。
      // 'all': 所有的模块，包括同步和异步。
      //'initial': 初始加载的模块即同步模块
      minSize: 102400, // module超过该大小才会被split 默认是30000kb 100kb 压缩之前的大小
      // maxSize: 2097152, // 2M
      minChunks: 1, // module被多少个chunks引用才会生成新的chunk  // 被entry引入的次数 （1 适合分离node_modules里的第三方库）
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/, // 只筛选从node_modules文件夹下引入的模块 这个要看上面minChunk是几
          priority: 10,
          // minSize: 10,
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: 0,
          // minSize: 10, //大于0个字节
        }
      }
    },
    minimize: false, // 压缩的默认是true
  },
  plugins: [
    new CleanWebpackPlugin(),
    extractText,
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
    // new HtmlWebpackPlugin({
    //   template: "./index.html",
    //   title: "main",
    //   inject: "body",
    //   filename: 'index.html',
    //   excludeChunks: ['about', 'home'], // 删除哪些chunks
    // }),
    new HtmlWebpackPlugin({
      excludeChunks: ['home'],
      template: "./pages/about/index.html",
      title: "about",
      inject: "body",
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ['about'],
      template: "./pages/home/index.html",
      title: "title [name]",
      inject: "body",
      filename: 'home.html',
    }),
    new BundleAnalyzerPlugin(),
  ]
}