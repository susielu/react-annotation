// import { circleHandles } from "../Handles"
import { arcBuilder } from "../Builder"
// import { event } from "d3-selection"

export const circleHandles = ({ cx = 0, cy = 0, r1, r2, padding }) => {
  const h = { move: { x: cx, y: cy } }

  if (r1 !== undefined) {
    h.r1 = { x: cx + r1 / Math.sqrt(2), y: cy + r1 / Math.sqrt(2) }
  }

  if (r2 !== undefined) {
    h.r2 = { x: cx + r2 / Math.sqrt(2), y: cy + r2 / Math.sqrt(2) }
  }

  if (padding !== undefined) {
    h.padding = { x: cx + r1 + padding, y: cy }
  }

  return h
}

export default ({
  radius,
  radiusPadding,
  outerRadius,
  innerRadius,
  editMode,
  type
}) => {
  // if (!subjectData.radius && !subjectData.outerRadius) {
  //   subjectData.radius = 20
  // }

  let handles = []
  const c = arcBuilder({
    data: { radius, outerRadius, innerRadius },
    className: "subject"
  })

  if (editMode) {
    const h = circleHandles({
      r1: c.data.outerRadius || c.data.radius,
      r2: c.data.innerRadius,
      padding: radiusPadding
    })

    const updateRadius = attr => {
      // const r = subjectData[attr] + event.dx * Math.sqrt(2)
      // subjectData[attr] = r
      // type.redrawSubject()
      // type.redrawConnector()
    }

    const cHandles = [
      {
        ...h.r1
        // drag: updateRadius.bind(
        //   type,
        //   outerRadius !== undefined ? "outerRadius" : "radius"
        // )
      }
    ]

    if (innerRadius) {
      cHandles.push({ ...h.r2, drag: updateRadius.bind(type, "innerRadius") })
    }
    handles = cHandles
    // handles = type.mapHandles(cHandles)
  }

  c.attrs["fill-opacity"] = 0

  return { components: [c], handles }
}
