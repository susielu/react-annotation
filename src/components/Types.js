import React, { PropTypes } from "react"
import Annotation from "./Annotation"
import EditableAnnotation from "./EditableAnnotation"
import ConnectorLine from "./ConnectorLine"
import ConnectorElbow from "./ConnectorElbow"
import SubjectCircle from "./Subject/SubjectCircle"
import Note from "./Note/Note"

const getAnnotationType = editMode =>
  editMode ? EditableAnnotation : Annotation

export function AnnotationLabel(props) {
  const AnnotationType = getAnnotationType(props.editMode)
  return (
    <AnnotationType {...props}>
      <ConnectorLine />
      <Note />
    </AnnotationType>
  )
}

export function AnnotationCallout(props) {
  const AnnotationType = getAnnotationType(props.editMode)
  return (
    <AnnotationType {...props}>
      <ConnectorLine />
      <Note />
    </AnnotationType>
  )
}

export function AnnotationCalloutElbow(props) {
  const AnnotationType = getAnnotationType(props.editMode)
  return (
    <AnnotationType {...props}>
      <ConnectorElbow />
      <Note />
    </AnnotationType>
  )
}

export function AnnotationCalloutCircle(props) {
  const AnnotationType = getAnnotationType(props.editMode)
  return (
    <AnnotationType {...props}>
      <ConnectorElbow />
      <SubjectCircle />
    </AnnotationType>
  )
}

export function AnnotationCalloutRect(props) {
  const AnnotationType = getAnnotationType(props.editMode)
  return (
    <AnnotationType {...props}>
      <ConnectorElbow />
      <SubjectCircle />
    </AnnotationType>
  )
}

export function AnnotationCalloutThreshold(props) {
  const AnnotationType = getAnnotationType(props.editMode)
  return (
    <AnnotationType {...props}>
      <ConnectorElbow />
      <SubjectCircle />
    </AnnotationType>
  )
}

export function AnnotationBadge(props) {
  const AnnotationType = getAnnotationType(props.editMode)
  return (
    <AnnotationType {...props}>
      <ConnectorElbow />
      <SubjectCircle />
    </AnnotationType>
  )
}
