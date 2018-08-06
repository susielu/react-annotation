import classnames from "../classnames"
import annotationMapper from "./Type"
import ConnectorLine from "../Connector/ConnectorLine"

export default function AnnotationLabel(props) {
  const className = classnames("label", props.className)
  return annotationMapper({ ...props, className }, ConnectorLine, {
    align: "middle"
  })
}
