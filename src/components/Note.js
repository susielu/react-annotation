import React, { PropTypes } from "react"
import Elbow from "./Connector/type-elbow"
import alignment from "./Note/alignment"

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
    const { orientation, padding, align, text, title, dx, dy } = this.props

    const titleWrapped =
      this.refs.title && this.wrapText(this.refs.title, title)
    const textWrapped = this.refs.text && this.wrapText(this.refs.text, text)

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

  wrapText(textRef, text, width = 30, lineHeight = 1.2) {
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
      textRef.nodeValue = line.join(" ")

      if (textRef.getComputedTextLength() > width && line.length > 1) {
        line.pop()
        tspans.push(
          <tspan {...initialAttrs} lineHeight={lineHeight + "em"}>
            {word}
          </tspan>
        )
      }
    }
    return <tspan {...initialAttrs}>{tspans}</tspan>
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
      wrap
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

    return (
      <g transform={`translate(${dx}, ${dy})`}>
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
            stroke="grey"
            fill="none"
          />
          {noteTitle}
          {noteText}
        </g>
      </g>
    )
  }
}

Note.defaultProps = {
  wrap: 150,
  align: "left",
  orientation: "topBottom",
  padding: 10
}

Note.propTypes = {}
