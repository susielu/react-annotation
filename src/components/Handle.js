import React, { PropTypes } from "react"
// import EndDot from "./Connector/end-dot"
import { DraggableCore } from "react-draggable"
export default class Handle extends React.Component {
  render() {
    const {
      x = 0,
      y = 0,
      r = 10,
      handleStart,
      handleDrag,
      handleStop
    } = this.props
    // const { x, y, dy, dx, lineData, color = "grey" } = this.props

    // const d = EndDot({ x, y, dx, dy, lineData })
    // const c = d.components[0]
    // return <c.type className={c.className} {...c.attrs} fill={color} />

    return (
      <DraggableCore
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
        defaultClassNameDragging="dragging"
      >
        <circle
          className="handle"
          cx={0}
          cy={0}
          r={r}
          strokeDasharray="1,2"
          stroke="grey"
          fill="white"
          fillOpacity={0}
          transform="translate(0,0"
        />
      </DraggableCore>
    )
  }
}

Handle.defaultProps = {}

Handle.propTypes = {}
