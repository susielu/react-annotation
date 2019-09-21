import SubjectBracket from "../Subject/SubjectBracket"
import BracketNote from "../Note/BracketNote"
import classnames from "../classnames"
import annotationMapper from "./Type"

export default function AnnotationBracket(props) {
  const className = classnames("bracket", props.className)
  return annotationMapper(
    { ...props, disable: ["connector"], className },
    null,
    null,
    SubjectBracket,
    { depth: 20 },
    BracketNote
  )
}
