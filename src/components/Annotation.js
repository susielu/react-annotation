import React, { PropTypes } from "react"

export default class Annotation extends React.Component {
  render() {
    const { x, y, dy, dx } = this.props

    console.log(React.Children.toArray(), this.props.children)

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { x, y, dx, dy, ...child.props })
    )

    return <g transform={`translate(${x}, ${y})`}>{childrenWithProps}</g>
  }
}

Annotation.defaultProps = {}

Annotation.propTypes = {}
