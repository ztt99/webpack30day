const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const  webpack  = require("webpack");

module.exports = (data)=>{
  console.log(data);
  return {
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
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      // new webpack.DefinePlugin({
      //   a:9999
      // }),
      new MiniCssExtractPlugin()
    ],
  }
}