import React from "react"
import Line from "viz-annotation/lib/Connector/type-line"
import Connector from "./Connector"

export default class ConnectorLine extends Connector {
  getComponents({ x, y, dy, dx, radius, outerRadius, width, height }) {
    return Line({ x, y, dx, dy, radius, outerRadius, width, height })
  }
}
