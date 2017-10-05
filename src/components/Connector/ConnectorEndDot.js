import React from "react"
import PropTypes from "prop-types"
import EndDot from "./end-dot"
import ConnectorEnd from "./ConnectorEnd"

export default class ConnectorEndDot extends ConnectorEnd {
  getComponents({ x, y, dy, dx, lineData }) {
    return EndDot({ x, y, dx, dy, lineData })
  }
}

ConnectorEndDot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  lineData: PropTypes.array
  //array of arrays of x,y coordinates for the connector line
}
