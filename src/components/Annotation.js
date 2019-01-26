import React from "react"
import classnames from "./classnames"
import PropTypes from "prop-types"

export default class Annotation extends React.Component {
  render() {
    const { x, y, nx, ny, events } = this.props

    const cleanedProps = Object.assign({}, this.props)
    delete cleanedProps.children

    const cleanedWithoutEvents = Object.assign({}, cleanedProps)
    delete cleanedWithoutEvents.events

    if (nx !== undefined) cleanedProps.dx = nx - x
    if (ny !== undefined) cleanedProps.dy = ny - y

    const childrenWithProps = React.Children.toArray(this.props.children).map(
      child =>
        React.cloneElement(child, {
          ...(typeof child.type === "string"
            ? cleanedWithoutEvents
            : cleanedProps),

          ...child.props
        })
    )
    const wrappedEvents = {}
    Object.keys(events).forEach(k => {
      wrappedEvents[k] = e => {
        events[k](this.props, this.state, e)
      }
    })

    return (
      <g
        className={classnames("annotation", this.props.className)}
        transform={`translate(${x}, ${y})`}
        {...wrappedEvents}
      >
        {childrenWithProps}
      </g>
    )
  }
}

Annotation.defaultProps = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  color: "grey",
  events: {}
}

Annotation.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  color: PropTypes.string,
  editMode: PropTypes.bool,
  events: PropTypes.object
}
