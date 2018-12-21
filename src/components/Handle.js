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

const makeHandler = (type, handleStart, handleStop, handleDrag) => {
  return e => {
    e.preventDefault()
    const xDim = "clientX"
    const yDim = "clientY"
    const oX = e.nativeEvent[xDim]
    const oY = e.nativeEvent[yDim]
    let x = oX
    let y = oY
    handleStart && handleStart()

    const move = d => {
      d.preventDefault()
      handleDrag &&
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
      handleStop && handleStop()
    }

    document.addEventListener(events[type].move, move, listenerOptions)
    document.addEventListener(events[type].stop, stop, listenerOptions)
  }
}

export default function Handle({
  x = 0,
  y = 0,
  r = 10,
  handleStart,
  handleStop,
  handleDrag
}) {
  return (
    <circle
      className="handle"
      cx={x}
      cy={y}
      r={r}
      onMouseDown={makeHandler("mouse", handleStart, handleStop, handleDrag)}
      onTouchStart={makeHandler("touch", handleStart, handleStop, handleDrag)}
      strokeDasharray="5"
      stroke="grey"
      fill="white"
      fillOpacity={0}
    />
  )
}

Handle.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  handleStart: PropTypes.func,
  handleStop: PropTypes.func,
  handleDrag: PropTypes.func
}
