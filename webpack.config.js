const path = require("path");

module.exports = {
  entry: {
    app: ["./public/javascripts/index.js"]
  },
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [{
      use: [{
        loader: "babel-loader"
      }]
    }]
  }
};