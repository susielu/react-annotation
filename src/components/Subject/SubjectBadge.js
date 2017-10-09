/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Badge from "./badge"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectBadge extends Subject {
  getComponents({ leftRight, topBottom, text, editMode, color }) {
    return Badge({ leftRight, topBottom, text, editMode, color })
  }
}

SubjectBadge.propTypes = {
  leftRight: PropTypes.oneOf(["left", "right"]),
  topBottom: PropTypes.oneOf(["top", "bottom"]),
  text: PropTypes.string,
  color: PropTypes.string,
  editMode: PropTypes.bool
}
