import SubjectThreshold from "../Subject/SubjectThreshold"
import ConnectorElbow from "../Connector/ConnectorElbow"
import classnames from "../classnames"
import annotationMapper from "./Type"

export default function AnnotationXYThreshold(props) {
  const className = classnames("callout xythreshold", props.className)
  return annotationMapper(
    { ...props, className },
    ConnectorElbow,
    { lineType: "horizontal" },
    SubjectThreshold
  )
}
