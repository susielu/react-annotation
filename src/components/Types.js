import React, { PropTypes } from "react"
import Annotation from "./Annotation"
import EditableAnnotation from "./EditableAnnotation"
import ConnectorLine from "./Connector/ConnectorLine"
import ConnectorElbow from "./Connector/ConnectorElbow"
import SubjectCircle from "./Subject/SubjectCircle"
import Note from "./Note/Note"

const getAnnotationType = editMode =>
  editMode ? EditableAnnotation : Annotation

// const annotationOptions = Subject => {
//   return props => {
//     const { disable = [], connectorType } = props
//     const CONNECTORS = {
//       type: {
//         curve: ConnectorCurve,
//         line: ConnectorLine,
//         elbow: ConnectorElbow
//       },
//       end: {
//         dot: ConnectorEndDot,
//         arrow: ConnectorEndArrow
//       }
//     }

//     let Connector
//     if (disable.indexOf("connector") !== -1) {
//       Connector = (connectorType && CONNECTORS[connectorType]) || connectorElbow
//     }

//     return (
//       <Annotation>
//         {Connector && (
//           <Connector>
//             <ConnectorEnd />
//           </Connector>
//         )}
//         {Note && <Note />}
//         {Subject && <Subject />}
//       </Annotation>
//     )
//   }
// }

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
