import babel from "rollup-plugin-babel"
import babelrc from "babelrc-rollup"

let pkg = require("./package.json")

const rc = babelrc()

const doesNotAcceptOptions = ["stage-2", "stage-0", "react"]
const acceptsOptionModules = ["es2015"]
rc.presets.forEach((preset, i) => {
  if (doesNotAcceptOptions.indexOf(preset[0]) > -1) {
    rc.presets[i] = preset[0]
  } else if (acceptsOptionModules.indexOf(preset[0]) === -1) {
    delete preset[1].modules // eslint-disable-line
  }
})

export default {
  entry: "src/components/web.js",
  plugins: [babel(rc)],
  targets: [
    {
      dest: pkg.web,
      format: "umd",
      moduleName: "React",
      sourceMap: true,
      globals: {
        react: "React",
        "prop-types": "PropTypes",
        "react-dom": "ReactDOM"
      }
    }
  ]
}
