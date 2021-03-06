
var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./core.jsx",
  output: {
    path: path.resolve(__dirname),
    filename: "./bundle/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
