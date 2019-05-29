const HtmlPlugin           = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
/* start new code */
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
/* end new code */
  plugins: [
    new HtmlPlugin({
      template: "./src/html/index.html"
    })
  ],
  entry: './src/js/index.js',
  mode: 'none'
};
