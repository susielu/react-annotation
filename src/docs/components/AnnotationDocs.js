import React from "react"
import DocumentComponent from "../layout/DocumentComponent"
const components = []

import EditableAnnotation from "../../components/EditableAnnotation"
import Annotation from "../../components/Annotation"
import Handle from "../../components/Handle"
import ConnectorLine from "../../components/ConnectorLine"
import ConnectorElbow from "../../components/ConnectorElbow"
import ConnectorEndDot from "../../components/ConnectorEndDot"
import ConnectorEndArrow from "../../components/ConnectorEndArrow"
import SubjectCircle from "../../components/SubjectCircle"
import SubjectBadge from "../../components/SubjectBadge"
import SubjectThreshold from "../../components/SubjectThreshold"
import Note from "../../components/Note"

components.push({
  name: "Annotation",
  proptypes: `
    {
     
    }
  `
})

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
    // <Annotation>
    //           <Note />
    //  <ConnectorEndDot />
    //         <ConnectorStartDot />
    //          </Annotation>

    examples.push({
      name: "Annotation",
      demo: (
        <svg width={1000} height={500}>
          <Handle x={100} y={100} />
          <EditableAnnotation x={200} y={100} dx={-100} dy={200} radius={50}>
            <ConnectorElbow>
              <ConnectorEndDot />
            </ConnectorElbow>
            <Note
              text="Hello let's test out some serious text wrapping"
              title="A test title for wrapping"
            />
            <SubjectCircle />
          </EditableAnnotation>
          <Annotation x={350} y={100} dx={-100} dy={200} radius={50}>
            <ConnectorLine />
            <Note
              text="Hello let's test out some serious text wrapping"
              title="A test title for wrapping"
            />
            <SubjectCircle />
          </Annotation>
          <Annotation x={500} y={100} dx={-100} dy={200}>
            <ConnectorElbow>
              <ConnectorEndArrow />
            </ConnectorElbow>
            <Note
              text="Hello let's test out some serious text wrapping"
              title="A test title for wrapping"
            />
            <SubjectThreshold y1={0} y2={10000} />
          </Annotation>

          <Annotation x={50} y={50}>
            <SubjectBadge leftRight="left" topBottom="bottom" text="A" />
          </Annotation>
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
