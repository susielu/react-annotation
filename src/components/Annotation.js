import React, { PropTypes } from "react"

export default class Annotation extends React.Component {
  render() {
    const { x, y, nx, ny } = this.props

    const cleanedProps = Object.assign({}, this.props)
    delete cleanedProps.children

    if (nx !== undefined) cleanedProps.dx = nx - x
    if (ny !== undefined) cleanedProps.dy = ny - y

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { ...cleanedProps, ...child.props })
    )

    return <g transform={`translate(${x}, ${y})`}>{childrenWithProps}</g>
  }
}

Annotation.defaultProps = {}

Annotation.propTypes = {}
