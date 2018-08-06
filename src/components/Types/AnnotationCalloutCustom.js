import SubjectCustom from "../Subject/SubjectCustom"
import ConnectorElbow from "../Connector/ConnectorElbow"
import classnames from "../classnames"
import annotationMapper from "./Type"

export default function AnnotationCalloutCustom(props) {
  const className = classnames("callout custom", props.className)
  return annotationMapper(
    { ...props, className },
    ConnectorElbow,
    { lineType: "horizontal" },
    SubjectCustom
  )
}
