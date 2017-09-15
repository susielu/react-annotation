import React, { PropTypes } from "react"
import Circle from "./circle"
import Subject from "./Subject"

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
  editMode: PropTypes.bool
}
