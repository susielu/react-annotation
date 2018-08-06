import SubjectCircle from "../Subject/SubjectCircle"

import ConnectorElbow from "../Connector/ConnectorElbow"
import classnames from "../classnames"
import annotationMapper from "./Type"

export default function AnnotationCalloutCircle(props) {
  const className = classnames("callout circle", props.className)
  return annotationMapper(
    { ...props, className },
    ConnectorElbow,
    { lineType: "horizontal" },
    SubjectCircle,
    { radius: 20 }
  )
}
