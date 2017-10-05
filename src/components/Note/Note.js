import React from "react"
import PropTypes from "prop-types"
import alignment from "./alignment"
import Handle from "../Handle"
import noteVertical from "./lineType-vertical"
import noteHorizontal from "./lineType-horizontal"

const getOuterBBox = (...domNodes) => {
  return [...domNodes].reduce(
    (p, c) => {
      if (c) {
        const bbox = c.getBBox()
        p.x = Math.min(p.x, bbox.x)
        p.y = Math.min(p.y, bbox.y)
        p.width = Math.max(p.width, bbox.width)

        const yOffset = c && c.attributes && c.attributes.y
        p.height = Math.max(
          p.height,
          ((yOffset && parseFloat(yOffset.value)) || 0) + bbox.height
        )
      }
      return p
    },
    { x: 0, y: 0, width: 0, height: 0 }
  )
}

export default class Note extends React.Component {
  state = {
    translateX: 0,
    translateY: 0,
    labelOffset: 0,
    bbox: { width: 0, height: 0, x: 0, y: 0 }
  }

  componentDidMount() {
    const {
      orientation,
      padding,
      align,
      lineType,
      label,
      title,
      wrap,
      dx,
      dy
    } = this.props

    const newState = {}
    if (title)
      newState.titleWrapped =
        this.refs.title && this.wrapText(this.refs.title, title, wrap)

    if (label)
      newState.labelWrapped =
        this.refs.label && this.wrapText(this.refs.label, label, wrap)

    this.setState(newState, () => {
      console.log("REFS", this.props, this.refs)

      const setLabel = () => {
        const bbox = getOuterBBox(this.refs.title, this.refs.label)
        const noteParams = {
          padding,
          bbox,
          offset: { x: dx, y: dy },
          orientation,
          align
        }

        if (lineType === "vertical") noteParams.orientation = "leftRight"
        else if (lineType === "horizontal") noteParams.orientation = "topBottom"

        const { x, y } = alignment(noteParams)

        this.setState({
          translateX: x,
          translateY: y,
          bbox
        })
      }

      if (title) {
        this.setState(
          {
            labelOffset: this.refs.title.getBBox().height
          },
          setLabel
        )
      } else if (label) {
        setLabel()
      }
    })
  }

  wrapText(textRef, text, width, lineHeight = 1.2) {
    const initialAttrs = {
      x: 0,
      dy: "1.2em"
    }

    const words = text
      .split(/[ \t\r\n]+/)
      .reverse()
      .filter(w => w !== "")

    let word,
      line = []

    const tspans = []

    while ((word = words.pop())) {
      line.push(word)
      textRef.lastChild.textContent = line.join(" ")

      const length = textRef.lastChild.getComputedTextLength()

      textRef.lastChild.textContent = ""

      if (length > width && line.length > 1) {
        line.pop()
        tspans.push(
          <tspan key={tspans.length} {...initialAttrs}>
            {line.join(" ")}
          </tspan>
        )
        line = [word]
      }
    }

    if (line.length !== 0) {
      tspans.push(
        <tspan key={tspans.length} {...initialAttrs}>
          {line.join(" ")}
        </tspan>
      )
    }

    return <tspan {...initialAttrs}>{tspans}</tspan>
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.bbox.width &&
      (prevProps.dx !== this.props.dx || prevProps.dy !== this.props.dy) &&
      (this.refs.title || this.refs.label)
    ) {
      const { orientation, padding, align, dx, dy, lineType } = this.props

      const bbox = getOuterBBox(this.refs.title, this.refs.label)
      const noteParams = {
        padding,
        bbox,
        offset: { x: dx, y: dy },
        orientation,
        align
      }

      if (lineType === "vertical") noteParams.orientation = "leftRight"
      else if (lineType === "horizontal") noteParams.orientation = "topBottom"

      const { x, y } = alignment(noteParams)
      const updates = { bbox }
      if (this.state.translateX !== x) updates.translateX = x
      if (this.state.translateY !== y) updates.translateY = y
      if (
        updates.translateX !== undefined ||
        updates.translateY !== undefined
      ) {
        this.setState(updates)
      }
    }
  }

  render() {
    const {
      dx,
      dy,
      title,
      label,
      orientation,
      padding,
      align,
      editMode,
      lineType,
      color,
      titleColor,
      labelColor
    } = this.props

    let noteTitle, noteText, noteLineType

    if (title) {
      noteTitle = (
        <text
          ref="title"
          className="annotation-note-title"
          fontWeight="bold"
          fill={titleColor || color}
        >
          {this.state.titleWrapped || (
            <tspan x={0} dy=".8em">
              {title}
            </tspan>
          )}
        </text>
      )
    }

    if (label) {
      noteText = (
        <text
          ref="label"
          className="annotation-note-label"
          y={this.state.labelOffset * 1.1}
          fill={labelColor || color}
        >
          {this.state.labelWrapped || (
            <tspan x={0} dy=".8em">
              {label}
            </tspan>
          )}
        </text>
      )
    }

    if (lineType && this.state.bbox.width) {
      const noteParams = {
        bbox: this.state.bbox,
        align,
        offset: { x: dx, y: dy }
      }

      const noteComponent = ((lineType === "vertical" &&
        noteVertical(noteParams)) ||
        (lineType === "horizontal" && noteHorizontal(noteParams))).components[0]

      noteLineType = (
        <noteComponent.type
          className={noteComponent.className}
          {...noteComponent.attrs}
          stroke={color}
        />
      )
    }

    let handle

    if (editMode) {
      handle = <Handle handleDrag={this.props.dragNote} />
    }

    return (
      <g transform={`translate(${dx}, ${dy})`} className="annotation-note">
        <g
          className="annotation-note-content"
          transform={`translate(${this.state.translateX},
          ${this.state.translateY})`}
          ref="note"
        >
          <rect
            className="annotation-note-bg"
            width={this.state.bbox.width}
            height={this.state.bbox.height}
            stroke="none"
            fill="white"
            fillOpacity="0"
          />
          {noteTitle}
          {noteText}
        </g>
        {noteLineType}
        {handle}
      </g>
    )
  }
}

Note.defaultProps = {
  wrap: 120,
  align: "dynamic",
  orientation: "topBottom",
  padding: 3
}

Note.propTypes = {
  dx: PropTypes.number,
  dy: PropTypes.number,
  title: PropTypes.string,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["leftRight", "topBottom"]),
  padding: PropTypes.number,
  align: PropTypes.oneOf([
    "left",
    "right",
    "middle",
    "top",
    "bottom",
    "dynamic"
  ]),
  editMode: PropTypes.bool,
  lineType: PropTypes.oneOf(["vertical", "horizontal"]),
  color: PropTypes.string,
  titleColor: PropTypes.string,
  labelColor: PropTypes.string
}
