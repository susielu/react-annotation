import React from "react"
import Annotation from "./Annotation"
import classnames from "classnames"

export default class EditableAnnotation extends React.Component {
  state = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0
  }

  componentWillMount() {
    this.setState({
      x: this.props.x,
      y: this.props.y,
      dx: this.props.dx,
      dy: this.props.dy
    })
  }

  dragSubject(event, data) {
    this.setState({
      x: this.state.x + data.deltaX,
      y: this.state.y + data.deltaY
    })
  }

  dragNote(event, data) {
    this.setState({
      dx: this.state.dx + data.deltaX,
      dy: this.state.dy + data.deltaY
    })
  }

  render() {
    const cleanedProps = Object.assign({}, this.props, {
      x: this.state.x,
      y: this.state.y,
      dx: this.state.dx,
      dy: this.state.dy,
      dragSubject: this.dragSubject.bind(this),
      dragNote: this.dragNote.bind(this),
      editMode: true,
      className: classnames(this.props.className, "editable")
    })

    return <Annotation {...cleanedProps} />
  }
}
