import React, { PropTypes } from "react"
import Threshold from "./threshold"
import Subject from "./Subject"

export default class SubjectThreshold extends Subject {
  getComponents({ x1, x2, y1, y2, x, y, editMode }) {
    return Threshold({ x1, x2, y1, y2, x, y, editMode })
  }
}

SubjectThreshold.propTypes = {
  x: PropTypes.number,
  x1: PropTypes.number,
  x2: PropTypes.number,
  y: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number,
  editMode: PropTypes.bool
}
