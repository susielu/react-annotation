import React, { PropTypes } from "react"
import Circle from "./Subject/circle"
import Handle from "./Handle"

export default class SubjectCircle extends React.Component {
  render() {
    const { radius, innerRadius, outerRadius, editMode } = this.props

    const d = Circle({ radius, innerRadius, outerRadius, editMode })
    console.log("handles", d, d.handles.length, d.handles)
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
        <Handle handleDrag={this.props.dragSubject} />
      </g>
    )
  }
}

SubjectCircle.defaultProps = {}

SubjectCircle.propTypes = {}
