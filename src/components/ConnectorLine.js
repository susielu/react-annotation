import React, { PropTypes } from "react"
import Line from "./Connector/type-line"

export default class ConnectorLine extends React.Component {
  render() {
    const { x, y, dy, dx, radius, outerRadius, width, height } = this.props

    const d = Line({ x, y, dx, dy, radius, outerRadius, width, height })

    return (
      <g>
        {d.components.map((c, i) => {
          return (
            <path
              key={i}
              {...c.attrs}
              className={c.className}
              fill="none"
              stroke="grey"
            />
          )
        })}
      </g>
    )
  }
}

ConnectorLine.defaultProps = {}

ConnectorLine.propTypes = {}
