import { arcBuilder } from "../Builder"

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
  editMode
}) => {
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

    const cHandles = [
      {
        ...h.r1,
        key: c.data.outerRadius ? "outerRadius" : "radius"
      }
    ]

    if (innerRadius) {
      cHandles.push({ ...h.r2, key: "innerRadius" })
    }
    handles = cHandles
  }

  c.attrs["fill-opacity"] = 0

  return { components: [c], handles }
}
