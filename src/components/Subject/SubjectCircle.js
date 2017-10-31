/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Circle from "./circle"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectCircle extends Subject {
  getComponents({
    radius = 20,
    innerRadius,
    outerRadius,
    radiusPadding,
    editMode
  }) {
    return Circle({ radius, radiusPadding, innerRadius, outerRadius, editMode })
  }
}

SubjectCircle.propTypes = {
  radius: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  radiusPadding: PropTypes.number,
  editMode: PropTypes.bool
}
