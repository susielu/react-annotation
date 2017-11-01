import { arcBuilder } from "../Builder"

export default ({ lineData, scale = 1 }) => {
  let dot = arcBuilder({
    className: "connector-end connector-dot",
    classID: "connector-end",
    data: { radius: 3 * Math.sqrt(scale) }
  })
  dot.attrs.transform = `translate(${lineData[0][0]}, ${lineData[0][1]})`

  return { components: [dot] }
}
