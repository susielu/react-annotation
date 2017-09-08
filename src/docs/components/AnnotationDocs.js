import React from "react"
import DocumentComponent from "../layout/DocumentComponent"
const components = []

import Annotation from "../../components/Annotation"
import ConnectorElbow from "../../components/ConnectorElbow"
import SubjectCircle from "../../components/SubjectCircle"
import SubjectBadge from "../../components/SubjectBadge"
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
        <svg width={500} height={500}>
          <Annotation x={200} y={100} dx={-100} dy={200} radius={50}>
            <ConnectorElbow />
            <Note
              text="Hello let's test out some serious text wrapping"
              title="A test title for wrapping"
            />
            <SubjectCircle />
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
