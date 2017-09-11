import React, { PropTypes } from "react"
import Rect from "./rect"
import Subject from "./Subject"

export default class SubjectRect extends Subject {
  getComponents({ width = 100, height = 100, editMode }) {
    return Rect({ width, height, editMode })
  }
}

SubjectRect.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  editMode: PropTypes.bool
}
