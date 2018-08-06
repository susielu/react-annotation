import ConnectorElbow from "../Connector/ConnectorElbow"
import classnames from "../classnames"
import annotationMapper from "./Type"

export default function AnnotationCalloutElbow(props) {
  const className = classnames("callout elbow", props.className)
  return annotationMapper({ ...props, className }, ConnectorElbow, {
    lineType: "horizontal"
  })
}
