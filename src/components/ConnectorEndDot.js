import React, { PropTypes } from "react"
import EndDot from "./Connector/end-dot"

export default class ConnectorEndDot extends React.Component {
  render() {
    const { x, y, dy, dx, lineData, color = "grey" } = this.props

    const d = EndDot({ x, y, dx, dy, lineData })
    const c = d.components[0]
    return <c.type className={c.className} {...c.attrs} fill={color} />
  }
}

ConnectorEndDot.defaultProps = {}

ConnectorEndDot.propTypes = {}
