/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Circle from "viz-annotation/lib/Subject/circle"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectCircle extends Subject {
  name = "SubjectCircle"

  getComponents({
    radius = 20,
    innerRadius,
    outerRadius,
    radiusPadding,
    editMode
  }) {
    const components = Circle({
      radius,
      radiusPadding,
      innerRadius,
      outerRadius,
      editMode
    })

    components.handleKeys = { radius, innerRadius, outerRadius }
    components.handleFunction = (h, data) => {
      return {
        [h.key]: components.handleKeys[h.key] + data.oDeltaX * Math.sqrt(2)
      }
    }
    return components
  }
}

SubjectCircle.propTypes = {
  radius: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  radiusPadding: PropTypes.number,
  editMode: PropTypes.bool
}
