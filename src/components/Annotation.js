import React, { PropTypes } from "react"

export default class Annotation extends React.Component {
  render() {
    const { x, y } = this.props
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { ...this.props, ...child.props })
    )

    return <g transform={`translate(${x}, ${y})`}>{childrenWithProps}</g>
  }
}

Annotation.defaultProps = {}

Annotation.propTypes = {}
