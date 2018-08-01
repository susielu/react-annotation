import React from "react"
import alignment from "viz-annotation/lib/Note/alignment"
import Handle from "../Handle"
import noteVertical from "viz-annotation/lib/Note/lineType-vertical"
import noteHorizontal from "viz-annotation/lib/Note/lineType-horizontal"
import PropTypes from "prop-types"

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
  constructor(props) {
    super(props)

    this.updateText = this.updateText.bind(this)

    // this.note = React.createRef()
    // this.title = React.createRef()
    // this.label = React.createRef()
  }
  state = {
    translateX: 0,
    translateY: 0,
    labelOffset: 0,
    changed: 0,
    bbox: { width: 0, height: 0, x: 0, y: 0 }
  }
  componentDidMount() {
    this.updateText(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.title !== this.props.title ||
      nextProps.label !== this.props.label ||
      nextProps.wrap !== this.props.wrap
    ) {
      this.updateText(nextProps)
    }
    if (
      nextProps.editMode &&
      (nextProps.align === "dynamic" || !nextProps.align)
    ) {
      this.updateText(nextProps)
    }
  }
  updateText({
    orientation,
    padding,
    align,
    lineType,
    label,
    title,
    wrap,
    wrapSplitter,
    dx,
    dy
  }) {
    const newState = {
      titleWrapped: null,
      labelWrapped: null
    }
    newState.changed = this.state.changed + 1

    if (title) {
      newState.titleWrapped =
        this.title &&
        this.wrapText(this.title, newState.changed, title, wrap, wrapSplitter)
    }
    if (label)
      newState.labelWrapped =
        this.label &&
        this.wrapText(this.label, newState.changed, label, wrap, wrapSplitter)

    this.setState(newState, () => {
      const setLabel = () => {
        const bbox = getOuterBBox(this.title, this.label)
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

      this.setState(
        {
          labelOffset: (title && this.title.getBBox().height) || 0
        },
        setLabel
      )
    })
  }

  wrapText(textRef, key, text, width, wrapSplitter) {
    const initialAttrs = {
      x: 0,
      dy: "1.2em"
    }

    const words = text
      .split(wrapSplitter || /[ \t\r\n]+/)
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
          <tspan key={tspans.length + text} {...initialAttrs}>
            {line.join(" ")}
          </tspan>
        )
        line = [word]
      }
    }

    if (line.length !== 0) {
      tspans.push(
        <tspan key={tspans.length + text} {...initialAttrs}>
          {line.join(" ")}
        </tspan>
      )
    }

    return (
      <tspan {...initialAttrs} key={key + text}>
        {tspans}
      </tspan>
    )
  }

  componentDidUpdate(prevProps) {
    const { orientation, padding, align, dx, dy, lineType } = this.props

    if (
      this.state.bbox.width &&
      (prevProps.dx !== this.props.dx || prevProps.dy !== this.props.dy) &&
      (this.title || this.label)
    ) {
      const bbox = getOuterBBox(this.title, this.label)
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
    } else if (
      this.state.align !== prevProps.align ||
      this.props.orientation !== prevProps.orientation ||
      this.props.padding !== prevProps.padding
    ) {
      const noteParams = {
        padding,
        bbox: this.state.bbox,
        offset: { x: dx, y: dy },
        orientation,
        align
      }

      if (lineType === "vertical") noteParams.orientation = "leftRight"
      else if (lineType === "horizontal") noteParams.orientation = "topBottom"

      const { x, y } = alignment(noteParams)
      const updates = {}
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
      align,
      editMode,
      lineType,
      color,
      titleColor,
      labelColor,
      bgPadding
    } = this.props

    let bgPaddingFinal = { top: 0, bottom: 0, left: 0, right: 0 }

    if (typeof bgPadding === "number") {
      bgPaddingFinal = {
        top: bgPadding,
        bottom: bgPadding,
        left: bgPadding,
        right: bgPadding
      }
    } else if (bgPadding && typeof bgPadding === "object") {
      bgPaddingFinal = Object.assign(bgPaddingFinal, bgPadding)
    }

    let noteTitle, noteText, noteLineType
    if (title) {
      noteTitle = (
        <text
          ref={el => (this.title = el)}
          className="annotation-note-title"
          fontWeight="bold"
          key="title"
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
          ref={el => (this.label = el)}
          className="annotation-note-label"
          y={this.state.labelOffset * 1.1}
          key="label"
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

      const noteComponent = (
        (lineType === "vertical" && noteVertical(noteParams)) ||
        (lineType === "horizontal" && noteHorizontal(noteParams))
      ).components[0]

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
      handle = (
        <Handle
          handleStart={this.props.dragStart}
          handleStop={this.props.dragEnd}
          handleDrag={this.props.dragNote}
        />
      )
    }

    return (
      <g
        transform={`translate(${dx}, ${dy})`}
        className="annotation-note"
        {...this.props.gProps}
      >
        <g
          className="annotation-note-content"
          transform={`translate(${this.state.translateX},
          ${this.state.translateY})`}
          ref={el => (this.note = el)}
        >
          <rect
            className="annotation-note-bg"
            width={
              this.state.bbox.width + bgPaddingFinal.left + bgPaddingFinal.right
            }
            x={-bgPaddingFinal.left}
            y={-bgPaddingFinal.top}
            height={
              this.state.bbox.height +
              bgPaddingFinal.top +
              bgPaddingFinal.bottom
            }
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
  bgPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
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
