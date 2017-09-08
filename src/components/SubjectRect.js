import React, { PropTypes } from "react"
import Rect from "./Subject/rect"
import Handle from "./Handle"

export default class SubjectRect extends React.Component {
  render() {
    const { width, height, editMode } = this.props

    const d = Rect({ width, height, editMode })

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

SubjectRect.defaultProps = {}

SubjectRect.propTypes = {}
