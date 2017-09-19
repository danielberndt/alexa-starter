// NOTE: paths are relative to each functions folder
const Webpack = require("webpack");
const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  target: "node",
  output: {
    path: path.resolve("./lib"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  externals: ["aws-sdk", "alexa-sdk"],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            query: {
              cacheDirectory: true,
            },
          },
        ],
        include: [path.resolve("./src")],
      },
    ],
  },
  plugins: [
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new MinifyPlugin({}, {}),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
};
