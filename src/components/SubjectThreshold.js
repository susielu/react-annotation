import React, { PropTypes } from "react"
import Threshold from "./Subject/threshold"

export default class SubjectThreshold extends React.Component {
  render() {
    const { x1, x2, y1, y2, x, y } = this.props

    const d = Threshold({ x1, x2, y1, y2, x, y })

    return (
      <g>
        {d.components.map((c, i) => {
          return (
            <c.type
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

SubjectThreshold.defaultProps = {}

SubjectThreshold.propTypes = {}
