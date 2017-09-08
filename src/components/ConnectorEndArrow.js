import React, { PropTypes } from "react"
import EndArrow from "./Connector/end-arrow"

export default class ConnectorEndArrow extends React.Component {
  render() {
    const { x, y, dy, dx, lineData, color = "grey" } = this.props

    let start = lineData[1]
    const end = lineData[0]
    const distance = Math.sqrt(
      Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2)
    )
    if (distance < 5 && lineData[2]) {
      start = lineData[2]
    }

    const d = EndArrow({ x, y, dx, dy, start, end })
    const c = d.components[0]
    return <c.type className={c.className} {...c.attrs} fill={color} />
  }
}

ConnectorEndArrow.defaultProps = {}

ConnectorEndArrow.propTypes = {}
