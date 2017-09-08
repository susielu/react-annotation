import React from "react"
import { HashRouter, Route } from "react-router-dom"
import Home from "./Home"
import Documentation from "./Documentation"
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()
import LayoutFooter from "./layout/Footer"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
// import 'bootstrap/dist/css/bootstrap.css';
import "./flexboxgrid.css"
import "./prism.css"
import "./index.css"

const gh = "reactstrap/component-template"
const basename = process.env.REACT_APP_GH_PAGES_PATH
  ? `/${process.env.REACT_APP_GH_PAGES_PATH}`
  : ""

const Docs = test => {
  return (
    <MuiThemeProvider>
      <div className="container-fluid">
        <HashRouter basename={basename} hashType="noslash">
          <div className="App">
            <div className="container-fluid">
              <Route
                exact
                pattern="/"
                render={({ location }) => {
                  if (location.pathname === "/") {
                    return (
                      <div>
                        <Home />
                        <Documentation />
                      </div>
                    )
                  }
                  return <Home />
                }}
              />
              <Route path="/:component" component={Documentation} />
            </div>
            <LayoutFooter gh={gh} />
          </div>
        </HashRouter>
      </div>
    </MuiThemeProvider>
  )
}

export default Docs
