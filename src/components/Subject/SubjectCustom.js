/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
// import Bracket from "./bracket"
import Subject from "./Subject"
import PropTypes from "prop-types"
import Handle from "../Handle"

export default class SubjectCustom extends Subject {
  render() {
    const { custom = "M0,0", editMode, transform } = this.props

    let handles
    if (editMode) {
      handles = (
        <Handle
          handleStart={this.props.dragStart}
          handleStop={this.props.dragEnd}
          handleDrag={this.props.dragSubject}
        />
      )
    }
    return (
      <g className="annotation-subject">
        <g transform={transform}>
          {typeof custom === "string" ? (
            <path d={custom} pointerEvents="none" />
          ) : (
            <g pointerEvents="none">{custom}</g>
          )}
        </g>
        {handles}
      </g>
    )
  }
}

SubjectCustom.propTypes = {
  editMode: PropTypes.bool
}
