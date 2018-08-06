import SubjectRect from "../Subject/SubjectRect"
import ConnectorElbow from "../Connector/ConnectorElbow"
import classnames from "../classnames"
import annotationMapper from "./Type"

export default function AnnotationCalloutRect(props) {
  const className = classnames("callout rect", props.className)
  return annotationMapper(
    { ...props, className },
    ConnectorElbow,
    { lineType: "horizontal" },
    SubjectRect,
    { width: 100, height: 100 }
  )
}
