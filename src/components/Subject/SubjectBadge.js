import React, { PropTypes } from "react"
import Badge from "./badge"
import Subject from "./Subject"

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
