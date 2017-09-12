import React, { PropTypes } from "react"
import Curve from "./type-curve"
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
    height
  }) {
    return Curve({
      curve,
      points,
      x,
      y,
      dx,
      dy,
      radius,
      outerRadius,
      width,
      height
    })
  }
}

ConnectorCurve.propTypes = {}
