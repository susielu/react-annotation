/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
// import Bracket from "./bracket"
import Subject from "./Subject"
import PropTypes from "prop-types"

export default class SubjectCustom extends Subject {
  render() {
    const { custom = "M0,0", customID, editMode, transform } = this.props

    return (
      <g transform={transform} className="annotation-subject">
        {typeof custom === "string" ? (
          <path d={custom} pointerEvents="none" />
        ) : (
          <g fill="black" pointerEvents="none">
            {custom}
          </g>
        )}
        <mask id={customID} pointerEvents="none">
          <g transform={transform}>
            <rect
              x={"-100%"}
              y={"-100%"}
              height={"200%"}
              width={"200%"}
              fill="white"
              pointerEvents="none"
            />
            {typeof custom === "string" ? (
              <path d={custom} fill="black" pointerEvents="none" />
            ) : (
              <g fill="black" pointerEvents="none">
                {custom.map(c => {
                  return React.cloneElement(
                    c,
                    Object.assign({}, c.props, { fill: "black", opacity: 1 })
                  )
                })}
              </g>
            )}
            }
          </g>
        </mask>
      </g>
    )
  }
}

SubjectCustom.propTypes = {
  editMode: PropTypes.bool
}
