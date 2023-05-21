const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = {
  mode: "development",
  devServer: {
    port: 9000,
  },
  devtool: false,
  // externals: {
  //   lodash: "_",
  // },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      { test: /.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /.(jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash:10].[ext]",
              esModule: false,
              outputPath: "images",
              publicPath: "/images",
            },
          },
        ],
        // 不添加这里，放在css中的图片不显示
        type: "javascript/auto",
      },
      { test: /.html$/, use: ["html-loader"] },
    ],
  },
  plugins: [
    // 将其他服务器上的sourcemap，放到自己的代码中
    new webpack.SourceMapDevToolPlugin({
      append: "//# sourceMappingURL=http://127.0.0.1:8001/[url]",
      filename: "[file].map",
    }),
    new webpack.ProvidePlugin({
      _:'lodash'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals:[
        {
          module: 'jquery',
          entry: {
            type:'js',
            path:'http://localhost:8000'
          },
          global: 'jQuery',
        },
      ]
    })
  ],
};
