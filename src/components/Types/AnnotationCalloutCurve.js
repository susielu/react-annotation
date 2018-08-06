import ConnectorCurve from "../Connector/ConnectorCurve"
import classnames from "../classnames"
import annotationMapper from "./Type"

export default function AnnotationCalloutCurve(props) {
  const className = classnames("callout curve", props.className)
  return annotationMapper({ ...props, className }, ConnectorCurve, {
    lineType: "horizontal"
  })
}
