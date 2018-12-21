const path = require("path")

module.exports = {
  mode: "production",
  entry: "./src/components/index.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js",
    library: "ReactAnnotation",
    libraryTarget: "window"
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /build|node_modules|styles/,
        loader: "babel-loader",
        include: path.join(__dirname, "src")
      }
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
}
