import React from "react"
import PropTypes from "prop-types"
import EndArrow from "./end-arrow"
import ConnectorEnd from "./ConnectorEnd"

export default class ConnectorEndArrow extends ConnectorEnd {
  getComponents({ x, y, dy, dx, lineData, color }) {
    let start = lineData[1]
    const end = lineData[0]
    const distance = Math.sqrt(
      Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2)
    )
    if (distance < 5 && lineData[2]) {
      start = lineData[2]
    }

    return EndArrow({ x, y, dx, dy, start, end })
  }
}

ConnectorEndArrow.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  lineData: PropTypes.array
}
