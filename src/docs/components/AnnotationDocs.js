import React from "react"
import DocumentComponent from "../layout/DocumentComponent"
const components = []

import EditableAnnotation from "../../components/EditableAnnotation"
import Annotation from "../../components/Annotation"
import Handle from "../../components/Handle"
import ConnectorLine from "../../components/Connector/ConnectorLine"
import ConnectorElbow from "../../components/Connector/ConnectorElbow"
import ConnectorCurve from "../../components/Connector/ConnectorCurve"
import ConnectorEndDot from "../../components/Connector/ConnectorEndDot"
import ConnectorEndArrow from "../../components/Connector/ConnectorEndArrow"
import SubjectCircle from "../../components/Subject/SubjectCircle"
import SubjectRect from "../../components/Subject/SubjectRect"
import SubjectBadge from "../../components/Subject/SubjectBadge"
import SubjectThreshold from "../../components/Subject/SubjectThreshold"
import Note from "../../components/Note/Note"
import { AnnotationLabel } from "../../components/Types"

components.push({
  name: "Annotation",
  proptypes: `
    {
     
    }
  `
})

//Annotation Collection on finish wrapping function

export default class DateInputDocs extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.state = {
      date: "04/12/17",
      openEndedDate: null
    }
  }

  onChange(name, newDate) {
    const update = {}
    update[name] = newDate
    this.setState(update)
  }

  render() {
    const examples = []

    examples.push({
      name: "Annotation",
      demo: (
        <svg width={1000} height={500}>
          <Handle x={100} y={100} />
          <AnnotationLabel
            x={50}
            y={100}
            dy={30}
            title="This title is a longer title"
            text="Now some longer text as well"
          />
          <EditableAnnotation x={200} y={100} dx={-100} dy={200}>
            <ConnectorElbow>
              <ConnectorEndDot />
            </ConnectorElbow>
            <Note
              text="Hello let's test out some serious text wrapping"
              title="1 - First"
            />
            <SubjectCircle />
          </EditableAnnotation>
          <EditableAnnotation
            className="TESTING"
            x={350}
            y={100}
            dx={-100}
            dy={200}
            width={100}
            height={200}
          >
            <ConnectorLine />
            <Note
              text="Hello let's test out some serious text wrapping"
              title="2 - Second"
              lineType="vertical"
            />
            <SubjectRect />
          </EditableAnnotation>
          <Annotation x={500} y={100} dx={-100} dy={100}>
            <ConnectorCurve>
              <ConnectorEndArrow />
            </ConnectorCurve>

            <Note
              text="Hello let's test out some serious text wrapping"
              title="3 - Third"
            />
            <SubjectThreshold y1={0} y2={10000} />
          </Annotation>

          <EditableAnnotation x={50} y={50}>
            <SubjectBadge leftRight="left" topBottom="bottom" text="A" />
          </EditableAnnotation>
        </svg>
      ),
      source: `
        import { Annotation } from 'react-annotation';
      `
    })

    return (
      <DocumentComponent
        name="Annotation"
        components={components}
        examples={examples}
      />
    )
  }
}

DateInputDocs.title = "DateInput"
