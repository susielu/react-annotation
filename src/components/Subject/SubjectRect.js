/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Rect from "./rect"
import Subject from "./Subject"
import PropTypes from "prop-types"

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
