/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Rect from "viz-annotation/lib/Subject/rect"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectRect extends Subject {
  name = "SubjectRect"

  getComponents({ width = 100, height = 100, editMode }) {
    const components = Rect({ width, height, editMode })
    components.handleKeys = { width, height }

    components.handleFunction = (h, data) => {
      return {
        [h.key]:
          h.key === "width" ? width + data.oDeltaX : height + data.oDeltaY
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
