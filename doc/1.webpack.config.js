const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
console.log(path.join(__dirname,'dist'));
module.exports = {
  mode: 'development',
  devServer: {
    port: 9000,
  },
  watch:true,
  // output: {
  //   // path:path.join(__dirname,'dist')
  //   publicPath: '/assets',
  // },
  devtool: false,
  externals: {
    lodash: '_',
  },
  module: {
    rules: [
      // {
      //   test: /.jsx?/,
      //   loader: 'eslint-loader', // 先进行代码校验，再编译代码
      //   enforce: 'pre',
      //   options: {
      //     fix: true, // 启动自动修复
      //   },
      //   exclude: /node_modules/, // 排除node_modules
      // },
      {
        test: /.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                // useBuiltIns: 'entry',
                // corejs: '3.22',
                // targets: '> 0.25%, not dead',
              },
            ]],
            plugins: [
              // ['@babel/plugin-transform-runtime',{
              //   corejs: 3
              // }]
              // ["@babel/plugin-proposal-decorators", { legacy: true }],
              // ["@babel/plugin-proposal-class-properties", { loose: true }],
            ],
          },
        },
      },

      { test: /.css$/, use: ['style-loader', 'css-loader'] },
      { test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      {
        test: /.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              esModule: false,
              outputPath: 'images',
            },
          },
        ],
        // 不添加这里，放在css中的图片不显示
        type: 'javascript/auto',
      },
      { test: /.html$/, use: ['html-loader'] },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    // 将其他服务器上的sourcemap，放到自己的代码中
    new webpack.SourceMapDevToolPlugin({
      append: '//# sourceMappingURL=http://127.0.0.1:8001/[url]',
      filename: '[file].map',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:['**/*']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
