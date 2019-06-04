const HtmlPlugin           = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs                   = require("fs");
const path                 = require("path");

let plugins = [];
const htmlFiles = fs.readdirSync(path.join(__dirname,"..","src","html"));
for (let i = 0; i < htmlFiles.length; i++) {
  const htmlFile = htmlFiles[i];
  if (path.extname(htmlFile) === ".html") {
    plugins.push(
      new HtmlPlugin({
        template: "./src/html/" + htmlFile,
        filename: htmlFile
      })
    );
  }
}

module.exports = {
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
  plugins: plugins,
  entry: './src/js/client/index.js',
  mode: 'none'
};
