import React from "react"
import Annotation from "../Annotation"
import EditableAnnotation from "../EditableAnnotation"
import ConnectorLine from "../Connector/ConnectorLine"
import ConnectorElbow from "../Connector/ConnectorElbow"
import ConnectorCurve from "../Connector/ConnectorCurve"
import ConnectorEndDot from "../Connector/ConnectorEndDot"
import ConnectorEndArrow from "../Connector/ConnectorEndArrow"
import DefaultSubject from "../Subject/Subject"
import Note from "../Note/Note"
import JSXNote from "../Note/JSXNote"

const getAnnotationType = editMode =>
  editMode ? EditableAnnotation : Annotation

export default function(
  props,
  Connector,
  NoteDefaultProps = {},
  Subject = DefaultSubject,
  SubjectDefaultProps = {},
  NoteType = Note
) {
  const {
    disable = [],
    connector,
    note,
    subject,
    x,
    y,
    dx,
    dy,
    nx,
    ny,
    color,
    className,
    onDrag,
    onDragStart,
    onDragEnd,
    editMode,
    events
  } = props
  const CONNECTORS = {
    type: {
      curve: ConnectorCurve,
      line: ConnectorLine,
      elbow: ConnectorElbow
    },
    end: {
      dot: ConnectorEndDot,
      arrow: ConnectorEndArrow
    }
  }

  let ConnectorType, ConnectorEndType
  if (disable.indexOf("connector") === -1) {
    ConnectorType = (connector && CONNECTORS.type[connector.type]) || Connector
    ConnectorEndType = connector && CONNECTORS.end[connector.end]
  }

  const AnnotationType = getAnnotationType(props.editMode)

  return (
    <AnnotationType
      x={x}
      y={y}
      dx={dx}
      dy={dy}
      nx={nx}
      ny={ny}
      color={color}
      className={className}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      editMode={editMode}
      {...SubjectDefaultProps}
      {...subject}
      events={events}
    >
      {ConnectorType && (
        <ConnectorType {...connector}>
          {ConnectorEndType && <ConnectorEndType />}
        </ConnectorType>
      )}
      {Subject && disable.indexOf("subject") === -1 && <Subject />}
      {note &&
        disable.indexOf("note") === -1 &&
        (React.isValidElement(note) || typeof note === "function" ? (
          <JSXNote noteDefaultProps={NoteDefaultProps} note={note} />
        ) : (
          <NoteType {...NoteDefaultProps} {...note} />
        ))}
    </AnnotationType>
  )
}
