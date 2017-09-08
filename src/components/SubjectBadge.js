import React, { PropTypes } from "react"
import Badge from "./Subject/badge"

export default class SubjectBadge extends React.Component {
  render() {
    const { leftRight, topBottom, text } = this.props
    const d = Badge({
      leftRight,
      topBottom,
      text
    })

    return (
      <g>
        {d.components.map((c, i) => {
          if (c) {
            const attrs = {}
            Object.keys(c.attrs).forEach(k => {
              if (c.attrs[k]) {
                attrs[k.replace(/-([a-z])/g, g => g[1].toUpperCase())] =
                  c.attrs[k]
              }
            })
            return (
              <c.type
                key={i}
                className={c.className}
                fill="grey"
                stroke="grey"
                {...attrs}
              >
                {attrs.text}
              </c.type>
            )
          }
        })}
      </g>
    )
  }
}

SubjectBadge.defaultProps = {}

SubjectBadge.propTypes = {}
