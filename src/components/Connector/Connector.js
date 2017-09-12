import React, { PropTypes } from "react"

export default class Connector extends React.Component {
  getComponents() {}

  render() {
    const { editMode, color, dx, dy } = this.props

    if (dx === 0 && dy === 0) {
      return <g className="annotation-connector" />
    }

    const d = this.getComponents(this.props) || []

    const cleanedProps = Object.assign({}, this.props)
    delete cleanedProps.children

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ...cleanedProps,
        ...child.props,
        lineData: d.components[0].data
      })
    )

    return (
      <g className="annotation-connector">
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
        {childrenWithProps}
      </g>
    )
  }
}

Connector.defaultProps = {}
Connector.propTypes = {}
