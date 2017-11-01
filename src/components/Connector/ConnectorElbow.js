/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Elbow from "viz-annotation/lib/Connector/type-elbow"
import Connector from "./Connector"

export default class ConnectorElbow extends Connector {
  getComponents({
    x,
    y,
    dy,
    dx,
    radius,
    radiusPadding,
    outerRadius,
    width,
    height
  }) {
    return Elbow({
      x,
      y,
      dx,
      dy,
      radius,
      radiusPadding,
      outerRadius,
      width,
      height
    })
  }
}
