/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Line from "./type-line"
import Connector from "./Connector"

export default class ConnectorLine extends Connector {
  getComponents({ x, y, dy, dx, radius, outerRadius, width, height }) {
    return Line({ x, y, dx, dy, radius, outerRadius, width, height })
  }
}
