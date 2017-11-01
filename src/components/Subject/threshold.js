import { lineBuilder } from "../Builder"

export default ({ x1, x2, y1, y2, x, y }) => {
  x1 = (x1 !== undefined ? x1 : x) - x
  x2 = (x2 !== undefined ? x2 : x) - x
  y1 = (y1 !== undefined ? y1 : y) - y
  y2 = (y2 !== undefined ? y2 : y) - y

  const data = [[x1, y1], [x2, y2]]
  return { components: [lineBuilder({ data, className: "subject" })] }
}
