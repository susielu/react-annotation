/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Rect from "./rect"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectRect extends Subject {
  getComponents({ width = 100, height = 100, editMode }) {
    const components = Rect({ width, height, editMode })
    components.handleKeys = { width, height }

    components.handleFunction = (h, data) => {
      return {
        [h.key]: h.key === "width" ? width + data.deltaX : height + data.deltaY
      }
    }

    return components
  }
}

SubjectRect.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  editMode: PropTypes.bool
}
