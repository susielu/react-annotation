/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import Handle from "../Handle";

export default function JSXNote(props) {
  const { note, dx, dy, editMode, dragStart, dragEnd, dragNote } = props;

  let handle;
  if (editMode) {
    handle = (
      <Handle
        handleStart={dragStart}
        handleStop={dragEnd}
        handleDrag={dragNote}
      />
    );
  }

  return (
    <g className={"annotation-note"} transform={`translate(${dx}, ${dy})`}>
      {typeof note === "function" ? note(props) : note}
      {handle}
    </g>
  );
}
