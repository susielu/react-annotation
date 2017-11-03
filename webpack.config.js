const path = require("path")

module.exports = {
  entry: "./src/components/index.js",
  output: {
    filename: "bundle.js",
    library: "ReactAnnotation",
    libraryTarget: "window"
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /build|node_modules|styles/,
        loaders: ["babel"],
        include: path.join(__dirname, "src")
      } //,
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
}
