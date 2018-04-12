var path = require("path");
module.exports = {
  entry: {
    app: ["/public/javascripts/index.js"]
  },
  output: {
    path: "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
      }
    ]
  },
};