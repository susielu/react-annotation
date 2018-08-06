import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "./theme";
// import { goToAnchor } from "react-scrollable-anchor" "material-ui/BottomNavigation"
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

import "./prism.css";
import "./index.css";
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
} from "./Sections";

class Docs extends React.Component {
  state = {
    open: false
  };
  render() {
    const sections = [
      { id: "introduction", name: "Introduction" },
      { id: "setup", name: "Setup" },
      { id: "types", name: "Types" },
      { id: "types-api", name: "Types API" },
      { id: "composable", name: "Composable" },
      { id: "composable-api", name: "Composable API" },
      { id: "in-practice", name: "In Practice" },
      { id: "examples", name: "Examples" },
      { id: "notes", name: "Notes" }
    ];

    const list = sections.map(d => (
      <p key={d.id}>
        <a href={"#" + d.id}>{d.name}</a>
      </p>
    ));

    const drawerSections = sections.map(d => {
      return (
        <MenuItem
          key={d.id}
          onTouchTap={() => {
            this.setState({ open: false });
            window.location = `#${d.id}`;
          }}
        >
          {d.name}
        </MenuItem>
      );
    });

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div>
          <div className="hide-sm">
            <h1>
              <img
                src="img/menu.png"
                role='presentation'
                onClick={() => {
                  this.setState({ open: !this.state.open });
                }}
              />react-annotation
            </h1>
          </div>
          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={open => this.setState({ open })}
          >
            {drawerSections}
          </Drawer>
          <div className="container-fluid main">
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 col-xs-12 smallHeader">
                <header className="box-row">
                  <h1 className="hide-xs">react-annotation</h1>

                  <p>
                    Made with <img alt="A picture of a heart" src="img/heart.png" /> by
                    <a href="http://www.susielu.com"> Susie Lu</a>
                  </p>
                </header>

                <div className="row">
                  <div className="col-sm-3 col-xs-12 hide-xs sticky-menu">
                    {list}
                  </div>
                  <div className="col-sm-9 col-xs-12">
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
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Docs;
