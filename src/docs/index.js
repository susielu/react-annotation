/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */ import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import { muiTheme } from "./theme"
// import { goToAnchor } from "react-scrollable-anchor"

import "./prism.css"
import "./index.css"
import {
  Introduction,
  Setup,
  Types,
  AnnotationTypesAPI,
  ExtendingTypes,
  InPractice,
  Examples,
  API,
  Notes
} from "./Sections"

const Docs = test => {
  const sections = [
    { id: "introduction", name: "Introduction" },
    { id: "setup", name: "Setup" },
    { id: "types", name: "Types" },
    { id: "extending-types", name: "Extending Types" },
    { id: "api", name: "API" },
    { id: "in-practice", name: "In Practice" },
    { id: "Examples", name: "Examples" },
    { id: "Notes", name: "Notes" }
  ].map(d => (
    <p>
      <a href={"#" + d.id}>{d.name}</a>
    </p>
  ))

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <header className="box-row">
              <h1 className="">react-annotation</h1>
              <p>
                Made with <img src="img/heart.png" /> by
                <a href="http://www.susielu.com"> Susie Lu</a>
              </p>
            </header>

            <div className="row">
              <div className="col-xs-3">{sections}</div>
              <div className="col-xs-9">
                <Introduction />
                <Setup />
                <Types />
                <AnnotationTypesAPI />
                <ExtendingTypes />
                <API />
                <InPractice />
                <Examples />
                <Notes />
              </div>
            </div>
          </div>
          <div className="col-xs-10 col-xs-offset-1">
            <div className="row">
              <footer className="col-xs-9 col-xs-offset-3">
                <small>
                  Made by <a href="http://www.susielu.com">Susie Lu</a>
                </small>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default Docs
