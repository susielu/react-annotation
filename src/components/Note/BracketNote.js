import React from "react"

import Note from "./Note"

export default function BracketNote({ width, height, depth, ...rest }) {
  let dx = rest.dx,
    orientation,
    align = "middle",
    dy = rest.dy

  if (height) {
    if (!dy) dy = height / 2
    if (!dx) dx = depth
    orientation = "leftRight"
  } else if (width) {
    if (!dx) dx = width / 2
    if (!dy) dy = depth
    orientation = "topBottom"
  }

  return (
    <Note
      align={align}
      orientation={orientation}
      padding={10}
      {...rest}
      editMode={false}
      dx={dx}
      dy={dy}
    />
  )
}
