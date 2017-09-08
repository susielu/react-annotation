import React, { PropTypes } from "react"
import Circle from "./Subject/circle"

export default class SubjectCircle extends React.Component {
  render() {
    const { radius, innerRadius, outerRadius } = this.props

    const d = Circle({ radius, innerRadius, outerRadius })
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

SubjectCircle.defaultProps = {}

SubjectCircle.propTypes = {}
