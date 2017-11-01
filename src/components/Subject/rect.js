import { lineBuilder } from "../Builder"

export default ({ width = 100, height = 100, editMode }) => {
  let handles = []

  const data = [[0, 0], [width, 0], [width, height], [0, height], [0, 0]]
  let rect = lineBuilder({ data, className: "subject" })

  if (editMode) {
    handles = [
      { x: width, y: height / 2, key: "width" },
      { x: width / 2, y: height, key: "height" }
    ]
  }
  rect.attrs["fill-opacity"] = 0.1
  return { components: [rect], handles }
}
