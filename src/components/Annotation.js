// @flow
import React from "react"
import classnames from "./classnames"

export type AnnotationType = {
  x: number,
  y: number, 
  color: string,
  className: string,
  events: { [key: string]: (props: AnnotationType, state: null) => void },
  nx?: number,
  ny?: number,
  editMode?: bool,
  children?: React$Node,
}

export default class Annotation extends React.Component<AnnotationType, null> {
  render() {
    const { x, y, nx, ny, events } = this.props

    const cleanedProps = Object.assign({}, this.props)
    delete cleanedProps.children

    if (nx != null) cleanedProps.dx = nx - x
    if (ny != null) cleanedProps.dy = ny - y

    const childrenWithProps = React.Children
      .toArray(this.props.children)
      .map(child =>
        React.cloneElement(child, {
          ...cleanedProps,
          ...child.props
        })
      )

    Object.keys(events).forEach(k => {
      if (events[k].target != null) {
        events[k] = events[k].bind(this, this.props, null)
      }
    })

    return (
      <g
        className={classnames("annotation", this.props.className)}
        transform={`translate(${x}, ${y})`}
        {...events}
      >
        {childrenWithProps}
      </g>
    )
  }
}
