import SubjectBadge from "../Subject/SubjectBadge"
import classnames from "../classnames"
import annotationMapper from "./Type"

export default function AnnotationBadge(props) {
  const className = classnames("badge", props.className)
  return annotationMapper(
    { ...props, disable: ["connector", "note"], className },
    null,
    null,
    SubjectBadge
  )
}
