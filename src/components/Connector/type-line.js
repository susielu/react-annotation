import { lineBuilder } from "../Builder"

export const lineSetup = ({
  dx,
  dy,
  radius,
  outerRadius,
  radiusPadding,
  width,
  height
}) => {
  let x1 = 0,
    x2 = dx,
    y1 = 0,
    y2 = dy

  if (outerRadius || radius) {
    const h = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    const angle = Math.asin(-y2 / h)
    const r = (outerRadius || radius) + (radiusPadding || 0)

    x1 = Math.abs(Math.cos(angle) * r) * (x2 < 0 ? -1 : 1)
    y1 = Math.abs(Math.sin(angle) * r) * (y2 < 0 ? -1 : 1)
  }

  if (width && height) {
    if ((width > 0 && dx > 0) || (width < 0 && dx < 0)) {
      if (Math.abs(width) > Math.abs(dx)) x1 = width / 2
      else x1 = width
    }
    if ((height > 0 && dy > 0) || (height < 0 && dy < 0)) {
      if (Math.abs(height) > Math.abs(dy)) y1 = height / 2
      else y1 = height
    }
    if (x1 === width / 2 && y1 === height / 2) {
      x1 = x2
      y1 = y2
    }
  }

  return [[x1, y1], [x2, y2]]
}

export default connectorData => {
  const data = lineSetup(connectorData)
  return { components: [lineBuilder({ data, className: "connector" })] }
}
