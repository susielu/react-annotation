import { lineBuilder, arcBuilder } from "../Builder"
// import { event } from "d3-selection"

// export default ({ subjectData = {}, type = {} }, annotation = {}) => {
export default ({
  radius = 14,
  leftRight,
  topBottom,
  text,
  color,
  editMode
}) => {
  console.log("in badge")
  // const typeSettings = type.typeSettings && type.typeSettings.subject

  // if (!subjectData.radius) {
  //   if (typeSettings && typeSettings.radius) {
  //     subjectData.radius = typeSettings.radius
  //   } else {
  //     subjectData.radius = 14
  //   }
  // }
  // if (!subjectData.x) {
  //   if (typeSettings && typeSettings.x) {
  //     subjectData.x = typeSettings.x
  //   }
  // }
  // if (!subjectData.y) {
  //   if (typeSettings && typeSettings.y) {
  //     subjectData.y = typeSettings.y
  //   }
  // }

  let handles = []
  const components = []
  // const radius = subjectData.radius
  const innerRadius = radius * 0.7
  let x = 0
  let y = 0

  const notCornerOffset = Math.sqrt(2) * radius
  const placement = {
    xleftcorner: -radius,
    xrightcorner: radius,
    ytopcorner: -radius,
    ybottomcorner: radius,
    xleft: -notCornerOffset,
    xright: notCornerOffset,
    ytop: -notCornerOffset,
    ybottom: notCornerOffset
  }

  if (leftRight && !topBottom) {
    x = placement[`x${leftRight}`]
  } else if (topBottom && !leftRight) {
    y = placement[`y${topBottom}`]
  } else if (leftRight && topBottom) {
    x = placement[`x${leftRight}corner`]
    y = placement[`y${topBottom}corner`]
  }

  const transform = `translate(${x}, ${y})`
  const circlebg = arcBuilder({ className: "subject", data: { radius } })
  circlebg.attrs.transform = transform
  circlebg.attrs.fill = color
  circlebg.attrs["stroke-linecap"] = "round"
  circlebg.attrs["stroke-width"] = "3px"

  const circle = arcBuilder({
    className: "subject-ring",
    data: { outerRadius: radius, innerRadius }
  })

  circle.attrs.transform = transform
  circle.attrs["stroke-width"] = "3px"
  circle.attrs.fill = "white"

  let pointer
  if ((x && y) || (!x && !y)) {
    pointer = lineBuilder({
      className: "subject-pointer",
      data: [[0, 0], [x || 0, 0], [0, y || 0], [0, 0]]
    })
  } else if (x || y) {
    const notCornerPointerXY = (v, sign = 1) =>
      (v && v / Math.sqrt(2) / Math.sqrt(2)) || sign * radius / Math.sqrt(2)

    pointer = lineBuilder({
      className: "subject-pointer",
      data: [
        [0, 0],
        [notCornerPointerXY(x), notCornerPointerXY(y)],
        [notCornerPointerXY(x, -1), notCornerPointerXY(y, -1)],
        [0, 0]
      ]
    })
  }

  if (pointer) {
    pointer.attrs.fill = color
    pointer.attrs["stroke-linecap"] = "round"
    pointer.attrs["stroke-width"] = "3px"
    components.push(pointer)
  }

  if (editMode) {
    const dragBadge = event => {
      const x =
        event.x < -radius * 2
          ? "left"
          : event.x > radius * 2 ? "right" : undefined
      const y =
        event.y < -radius * 2
          ? "top"
          : event.y > radius * 2 ? "bottom" : undefined

      // type.redrawSubject()
      return { x, y }
    }

    const bHandles = {
      x: x * 2,
      y: y * 2,
      drag: dragBadge, //.bind(type),
      type: "dragXY"
    }
    if (!bHandles.x && !bHandles.y) {
      bHandles.y = -radius
    }

    handles = bHandles //type.mapHandles([bHandles])
  }

  let textNode
  if (text) {
    textNode = {
      type: "text",
      className: "badge-text",
      attrs: {
        fill: "white",
        stroke: "none",
        "font-size": ".7em",
        text: text,
        "text-anchor": "middle",
        dy: ".25em",
        x,
        y
      }
    }
  }

  components.push(circlebg)
  components.push(circle)
  components.push(textNode)

  return { components, handles }
}
