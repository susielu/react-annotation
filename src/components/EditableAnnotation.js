// @flow
import React from "react"
import Annotation from "./Annotation"
import classnames from "./classnames"

export type PositionType = {
  x: number,
  y: number, 
  dx: number,
  dy: number,
}
export type EditableAnnotationProps = {
  ...PositionType,
  className: string,
  onDragEnd: (data: PositionType) => void,
  onDragStart: (data: PositionType) => void,
  onDrag: (data: PositionType) => void,
}

export type EditableAnnotationState = PositionType

export default class EditableAnnotation extends React.Component<EditableAnnotationProps, EditableAnnotationState>  {
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

  getData() {
    return Object.assign({}, this.props, this.state)
  }

  dragEnd() {
    if (this.props.onDragEnd) {
      this.props.onDragEnd(this.getData())
    }
  }

  dragStart() {
    if (this.props.onDragStart) {
      this.props.onDragStart(this.getData())
    }
  }

  dragSubject<T>(event: SyntheticEvent<T>, data: { deltaX: number, deltaY: number }) {
    this.setState(
      {
        x: this.state.x + data.deltaX,
        y: this.state.y + data.deltaY
      },
      () => {
        if (this.props.onDrag) this.props.onDrag(this.getData())
      }
    )
  }

  dragSubjectSettings<T>(event: SyntheticEvent<T>, data: { deltaX: number, deltaY: number }) {
    this.setState(this.state, () => {
      if (this.props.onDrag) this.props.onDrag(this.getData())
    })
  }

  dragNote<T>(event: SyntheticEvent<T>, data: { deltaX: number, deltaY: number }) {
    this.setState(
      {
        dx: this.state.dx + data.deltaX,
        dy: this.state.dy + data.deltaY
      },
      () => {
        if (this.props.onDrag) this.props.onDrag(this.getData())
      }
    )
  }

  render() {
    const cleanedProps = {
      ...this.props,
      ...this.state,
      dragSubject: this.dragSubject.bind(this),
      dragNote: this.dragNote.bind(this),
      dragSubjectSettings: this.dragSubjectSettings.bind(this),
      dragEnd: this.dragEnd.bind(this),
      dragStart: this.dragStart.bind(this),
      editMode: true,
      className: classnames(this.props.className, "editable")
    }

    return <Annotation {...cleanedProps} />
  }
}
