const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 9000,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                //与@babel/plugin-transform-runtime 不同时使用
                // {
                //   useBuiltIns: "entry",
                //   corejs: "3.22",
                // },
              ],
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  absoluteRuntime: false,
                  corejs: false,
                  // true 提取到全局，不会多次引用  false 只要模块中使用，就引入
                  // 是否提取单独的方法
                  helpers: true,
                  // 是否以不污染全局变量的情况下 转换，就是每个文件都会引入
                  regenerator: true,
                  version: "7.0.0-beta.0",
                },
              ],
              ["@babel/plugin-proposal-class-properties"],
            ],
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
      _: "lodash",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
    // 将外部链接加载到html上
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "jquery",
          entry: {
            type: "js",
            path: "http://localhost:8000",
          },
          global: "jQuery",
        },
      ],
    }),
  ],
};
