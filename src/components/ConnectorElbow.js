import React, { PropTypes } from "react"
import Elbow from "./Connector/type-elbow"

export default class ConnectorElbow extends React.Component {
  render() {
    const { x, y, dy, dx } = this.props

    const d = Elbow({ x, y, dx, dy })
    console.log(d)
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

ConnectorElbow.defaultProps = {}

ConnectorElbow.propTypes = {}
