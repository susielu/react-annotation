/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import EndArrow from "viz-annotation/lib/Connector/end-arrow"
import ConnectorEnd from "./ConnectorEnd"
import PropTypes from "prop-types"

export default class ConnectorEndArrow extends ConnectorEnd {
  getComponents({ x, y, dy, dx, lineData, scale }) {
    let start = lineData[1]
    const end = lineData[0]
    const distance = Math.sqrt(
      Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2)
    )
    if (distance < 5 && lineData[2]) {
      start = lineData[2]
    }

    return EndArrow({ x, y, dx, dy, start, end, scale })
  }
}

ConnectorEndArrow.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  scale: PropTypes.number,
  lineData: PropTypes.array
}
