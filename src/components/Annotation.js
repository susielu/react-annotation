import React, { PropTypes } from "react"
import classnames from "classnames"

export default class Annotation extends React.Component {
  render() {
    const { x, y, nx, ny } = this.props

    const cleanedProps = Object.assign({}, this.props)
    delete cleanedProps.children

    if (nx !== undefined) cleanedProps.dx = nx - x
    if (ny !== undefined) cleanedProps.dy = ny - y

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        color: "grey",
        ...cleanedProps,
        ...child.props
      })
    )

    return (
      <g
        className={classnames("annotation", this.props.className)}
        transform={`translate(${x}, ${y})`}
      >
        {childrenWithProps}
      </g>
    )
  }
}

Annotation.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  color: PropTypes.string,
  editMode: PropTypes.bool
}
