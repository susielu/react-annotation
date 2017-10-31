/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Bracket from "./bracket"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectBracket extends Subject {
  getComponents({ height, width, depth = 20, type = "square", editMode }) {
    return Bracket({ height, width, depth, type, editMode })
  }
}

SubjectBracket.propTypes = {
  start: PropTypes.arrayOf(PropTypes.number),
  end: PropTypes.arrayOf(PropTypes.number),
  // x: PropTypes.number,
  // x1: PropTypes.number,
  // x2: PropTypes.number,
  // y: PropTypes.number,
  // y1: PropTypes.number,
  // y2: PropTypes.number,
  editMode: PropTypes.bool
}
