/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Bracket from "viz-annotation/lib/Subject/bracket"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectBracket extends Subject {
  name = "SubjectBracket"

  getComponents({ height, width, depth = 20, type = "square", editMode }) {
    const components = Bracket({ height, width, depth, type, editMode })

    const handleKeys = { height, width, depth }
    components.handleFunction = (h, data) => {
      if (h.key === "depth") {
        return {
          depth: depth + data[`oDelta${h.type}`]
        }
      } else {
        return {
          [h.key]:
            handleKeys[h.key] + data[h.key === "width" ? "oDeltaX" : "oDeltaY"]
        }
      }
    }

    return components
  }
}

SubjectBracket.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  depth: PropTypes.number,
  editMode: PropTypes.bool
}
