/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Threshold from "viz-annotation/lib/Subject/threshold"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectThreshold extends Subject {
  name = "SubjectThreshold"

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
