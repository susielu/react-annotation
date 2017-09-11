import React, { PropTypes } from "react"
import alignment from "./alignment"
import Handle from "../Handle"

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
    textOffset: 0,
    bbox: { width: 0, height: 0, x: 0, y: 0 }
  }

  componentDidMount() {
    const {
      orientation,
      padding,
      align,
      text,
      title,
      wrap,
      dx,
      dy
    } = this.props

    const titleWrapped =
      this.refs.title && this.wrapText(this.refs.title, title, wrap)
    const textWrapped =
      this.refs.text && this.wrapText(this.refs.text, text, wrap)

    this.setState(
      {
        titleWrapped,
        textWrapped
      },
      () => {
        this.setState(
          {
            textOffset: this.refs.title.getBBox().height
          },
          () => {
            const bbox = getOuterBBox(this.refs.title, this.refs.text)
            const noteParams = {
              padding,
              bbox,
              offset: { x: dx, y: dy },
              orientation,
              align
            }

            const { x, y } = alignment(noteParams)

            this.setState({
              translateX: x,
              translateY: y,
              bbox
            })
          }
        )
      }
    )
  }

  wrapText(textRef, text, width, lineHeight = 1.2) {
    const initialAttrs = {
      x: 0,
      dy: ".8em"
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
          <tspan {...initialAttrs} lineHeight={lineHeight + "em"}>
            {line.join(" ")}
          </tspan>
        )
        line = [word]
      }
    }

    if (line.length !== 0) {
      tspans.push(
        <tspan {...initialAttrs} lineHeight={lineHeight + "em"}>
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
      (this.refs.title || this.refs.text)
    ) {
      const { orientation, padding, align, dx, dy } = this.props

      const bbox = getOuterBBox(this.refs.title, this.refs.text)
      const noteParams = {
        padding,
        bbox,
        offset: { x: dx, y: dy },
        orientation,
        align
      }

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
      text,
      dx,
      dy,
      title,
      orientation,
      padding,
      align,
      editMode
    } = this.props
    let noteTitle, noteText

    if (title) {
      noteTitle = (
        <text ref="title" className="annotation-note-title" fontWeight="bold">
          {this.state.titleWrapped || (
            <tspan x={0} dy=".8em">
              {text}
            </tspan>
          )}
        </text>
      )
    }

    if (text) {
      noteText = (
        <text
          ref="text"
          className="annotation-note-text"
          y={this.state.textOffset * 1.1}
        >
          {this.state.textWrapped || (
            <tspan x={0} dy=".8em">
              {text}
            </tspan>
          )}
        </text>
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
        {handle}
      </g>
    )
  }
}

Note.defaultProps = {
  wrap: 120,
  align: "dynamic",
  orientation: "topBottom",
  padding: 10
}

Note.propTypes = {}
