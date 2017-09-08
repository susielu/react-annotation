import React from "react"

import ComponentCard from "./ComponentCard"
import AnnotationDocs from "./components/AnnotationDocs"
import "./../components/styles.css"

const components = {
  dateInput: AnnotationDocs
}

const Documentation = ({ match }) => {
  const selected = match && match.params.component

  let selectedDoc
  const Doc = components[selected]

  const allDocs = Object.keys(components).map(c => {
    const cTitle = components[c].title

    return (
      <ComponentCard
        path={c}
        key={cTitle}
        title={cTitle}
        selected={(Doc && Doc.title) === cTitle}
      />
    )
  })

  if (components[selected]) {
    selectedDoc = (
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <Doc />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <h2 id="components">Components</h2>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">{allDocs}</div>
      </div>
      {selectedDoc}
    </div>
  )
}

export default Documentation
