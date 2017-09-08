import React, { PropTypes } from "react"
import Elbow from "./Connector/type-elbow"

export default class ConnectorElbow extends React.Component {
  render() {
    const {
      x,
      y,
      dy,
      dx,
      radius,
      outerRadius,
      innerRadius,
      width,
      height
    } = this.props

    const d = Elbow({
      x,
      y,
      dx,
      dy,
      radius,
      outerRadius,
      innerRadius,
      width,
      height
    })

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
        {childrenWithProps}
      </g>
    )
  }
}

ConnectorElbow.defaultProps = {}

ConnectorElbow.propTypes = {}
