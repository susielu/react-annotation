/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import Badge from "viz-annotation/lib/Subject/badge"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectBadge extends Subject {
  getComponents({ leftRight, topBottom, text, editMode, color, radius }) {
    const components = Badge({
      leftRight,
      topBottom,
      text,
      editMode,
      color,
      radius
    })

    components.handleKeys = { leftRight, topBottom }
    components.handleFunction = (h, data) => {
      const lr =
        data.x < -radius * 2
          ? "left"
          : data.x > radius * 2 ? "right" : undefined
      const tb =
        data.y < -radius * 2
          ? "top"
          : data.y > radius * 2 ? "bottom" : undefined

      return {
        leftRight: lr,
        topBottom: tb
      }
    }

    return components
  }
}

SubjectBadge.propTypes = {
  leftRight: PropTypes.oneOf(["left", "right"]),
  topBottom: PropTypes.oneOf(["top", "bottom"]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  editMode: PropTypes.bool
}
