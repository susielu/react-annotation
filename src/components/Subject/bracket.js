import { lineBuilder, pathBuilder } from "../Builder"

//This curly brace function was
//made by Alex Hornbake
//http://bl.ocks.org/alexhornbake/6005176
function makeCurlyBrace(x1, y1, x2, y2, w, q) {
  //Calculate unit vector
  let dx = x1 - x2
  let dy = y1 - y2
  let len = Math.sqrt(dx * dx + dy * dy)
  dx = dx / len
  dy = dy / len

  //Calculate Control Points of path,
  let qx1 = x1 + q * w * dy
  let qy1 = y1 - q * w * dx
  let qx2 = x1 - 0.25 * len * dx + (1 - q) * w * dy
  let qy2 = y1 - 0.25 * len * dy - (1 - q) * w * dx
  let tx1 = x1 - 0.5 * len * dx + w * dy
  let ty1 = y1 - 0.5 * len * dy - w * dx
  let qx3 = x2 + q * w * dy
  let qy3 = y2 - q * w * dx
  let qx4 = x1 - 0.75 * len * dx + (1 - q) * w * dy
  let qy4 = y1 - 0.75 * len * dy - (1 - q) * w * dx

  return (
    "M " +
    x1 +
    " " +
    y1 +
    " Q " +
    qx1 +
    " " +
    qy1 +
    " " +
    qx2 +
    " " +
    qy2 +
    " T " +
    tx1 +
    " " +
    ty1 +
    " M " +
    x2 +
    " " +
    y2 +
    " Q " +
    qx3 +
    " " +
    qy3 +
    " " +
    qx4 +
    " " +
    qy4 +
    " T " +
    tx1 +
    " " +
    ty1
  )
}

export default ({ height, width, depth, type, editMode }) => {
  let handles = []
  let data
  let bracket
  if (type === "square") {
    if (height) {
      data = [[0, 0], [depth, 0], [depth, height], [0, height]]
    } else if (width) {
      data = [[0, 0], [0, depth], [width, depth], [width, 0]]
    }
    bracket = lineBuilder({ data, className: "subject" })
  } else if (type === "curly") {
    bracket = pathBuilder({
      d: makeCurlyBrace(
        0,
        0,
        width || 0,
        height || 0,
        (height && height > 0) || (width && width < 0) ? -depth : depth,
        0.55
      ),
      className: "subject"
    })
  }

  if (editMode) {
    handles = [
      {
        x: height ? depth : width / 2,
        y: height ? height / 2 : depth,
        key: "depth",
        type: height ? "X" : "Y"
      },
      {
        x: width || 0,
        y: height || 0,
        key: height ? "height" : "width"
      }
    ]
  }

  bracket.attrs["fill-opacity"] = 0.1
  return { components: [bracket], handles }
}
