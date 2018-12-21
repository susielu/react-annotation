import React from "react"
import PropTypes from "prop-types"

const events = {
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup"
  },
  touch: {
    start: "touchstart",
    move: "touchemove",
    stop: "touchend"
  }
}

const listenerOptions = { passive: false }

export default class Handle extends React.Component {
  constructor(props) {
    super(props)

    this.makeHandler = this.makeHandler.bind(this)
  }

  makeHandler(type) {
    return e => {
      e.preventDefault()
      const { handleStart, handleDrag, handleStop } = this.props
      const xDim = "clientX"
      const yDim = "clientY"
      const oX = e.nativeEvent[xDim]
      const oY = e.nativeEvent[yDim]
      let x = oX
      let y = oY
      handleStart()

      const move = d => {
        d.preventDefault()
        handleDrag(d, {
          deltaX: d[xDim] - x,
          deltaY: d[yDim] - y,
          oDeltaX: d[xDim] - oX,
          oDeltaY: d[yDim] - oY
        })
        x = d[xDim]
        y = d[yDim]
      }

      const stop = e => {
        e.preventDefault()
        document.removeEventListener(events[type].move, move, listenerOptions)
        document.removeEventListener(events[type].stop, stop, listenerOptions)
        handleStop()
      }

      document.addEventListener(events[type].move, move, listenerOptions)
      document.addEventListener(events[type].stop, stop, listenerOptions)
    }
  }

  render() {
    const { x = 0, y = 0, r = 10 } = this.props

    return (
      <circle
        className="handle"
        cx={x}
        cy={y}
        r={r}
        // style={{ touchAction: "none" }}
        onMouseDown={this.makeHandler("mouse")}
        onTouchStart={this.makeHandler("touch")}
        strokeDasharray="5"
        stroke="grey"
        fill="white"
        ref={handle => {
          this.handle = handle
        }}
        fillOpacity={0}
      />
    )
  }
}

Handle.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  handleStart: PropTypes.func,
  handleStop: PropTypes.func,
  handleDrag: PropTypes.func
}
