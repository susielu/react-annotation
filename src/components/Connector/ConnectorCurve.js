import Curve from "viz-annotation/lib/Connector/type-curve"
import Connector from "./Connector"

export default class ConnectorCurve extends Connector {
  getComponents({
    curve,
    points,
    x,
    y,
    dx,
    dy,
    radius,
    outerRadius,
    width,
    height,
    editMode
  }) {
    const components = Curve({
      curve,
      points,
      x,
      y,
      dx,
      dy,
      radius,
      outerRadius,
      width,
      height,
      editMode
    })

    components.handleKeys = { points: components.handles }
    components.handleFunction = (h, data) => {
      const p = components.points.slice(0)
      p[h.index] = [h.x + data.oDeltaX, h.y + data.oDeltaY]

      return {
        points: p
      }
    }

    return components
  }
}
