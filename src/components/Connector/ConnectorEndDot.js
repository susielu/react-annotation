/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import EndDot from "viz-annotation/lib/Connector/end-dot"
import ConnectorEnd from "./ConnectorEnd"
import PropTypes from "prop-types"

export default class ConnectorEndDot extends ConnectorEnd {
  getComponents({ x, y, dy, dx, lineData, scale }) {
    return EndDot({ x, y, dx, dy, lineData, scale })
  }
}

ConnectorEndDot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  scale: PropTypes.number,
  lineData: PropTypes.array
  //array of arrays of x,y coordinates for the connector line
}
