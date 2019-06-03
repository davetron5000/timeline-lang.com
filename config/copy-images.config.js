const CopyPlugin           = require("copy-webpack-plugin");
const sharp                = require("sharp");
const path                 = require("path");

module.exports = function(env) {
  const source = "./src/images";
  const dest = `../${env}/images`;

  return new CopyPlugin([
    {
      from: source,
      to: dest,
      transform(content,path) {
        return sharp(Buffer.from(content)).resize({ width: 300 }).toBuffer();
      },
      transformPath(targetPath, absolutePath) {
        const parsed = path.parse(targetPath);
        return path.format({
          dir: parsed.dir,
          ext: parsed.ext,
          name: parsed.name + "__thumbnail"
        });
      }
    },
    {
      from: source,
      to: dest
    }
  ]);
};
