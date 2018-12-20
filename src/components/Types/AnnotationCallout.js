import classnames from "../classnames"
import annotationMapper from "./Type"
import ConnectorLine from "../Connector/ConnectorLine"

export default function AnnotationCallout(props) {
  const className = classnames("callout", props.className)
  return annotationMapper({ ...props, className }, ConnectorLine, {
    lineType: "horizontal"
  })
}
