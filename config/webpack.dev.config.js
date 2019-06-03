const path                 = require("path");
const Merge                = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CommonConfig         = require("./webpack.common.config.js");
const ImageCopying         = require("./copy-images.config.js");


module.exports = Merge(CommonConfig, {
  output: {
    path: path.join(__dirname, "../dev"),
    filename: "bundle.js"
  },
  devServer: {
    writeToDisk: true
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "styles.css" }),
    ImageCopying("dev")
  ]
});
