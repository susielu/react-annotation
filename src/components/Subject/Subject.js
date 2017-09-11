import React, { PropTypes } from "react"
import Handle from "../Handle"

export default class Subject extends React.Component {
  getComponents() {}

  render() {
    const { editMode, color } = this.props

    const d = this.getComponents(this.props) || []

    let handles
    if (editMode) {
      handles = <Handle handleDrag={this.props.dragSubject} />
    }

    return (
      <g className="annotation-subject">
        {d.components.map((c, i) => {
          const attrs = {}

          Object.keys(c.attrs).forEach(k => {
            if (c.attrs[k] && k !== "text") {
              attrs[k.replace(/-([a-z])/g, g => g[1].toUpperCase())] =
                c.attrs[k]
            }
          })
          return (
            <c.type
              key={i}
              className={c.className}
              fill="none"
              stroke={color}
              {...attrs}
            >
              {c.attrs.text}
            </c.type>
          )
        })}
        {handles}
      </g>
    )
  }
}

Subject.defaultProps = {}
Subject.propTypes = {}
