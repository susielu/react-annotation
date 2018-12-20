import React from "react"
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card"
import Toggle from "material-ui/Toggle"
import TextField from "material-ui/TextField"
import FloatingActionButton from "material-ui/FloatingActionButton"

import Annotations from "../components/index"
import theme from "./theme"
import { Code } from "./Sections"
import { PuppersIcon } from "./Icons"

const types = {
  AnnotationLabel: {
    typeSettings: {
      className: "show-bg",
      note: {
        align: "middle",
        orientation: "topBottom",
        bgPadding: 20,
        padding: 15,
        titleColor: "#59039c"
      },
      connector: { type: "line" }
    },
    summary: "A centered label annotation",
    img: "a-label.png"
  },
  AnnotationCallout: {
    typeSettings: {
      className: "show-bg",
      note: {
        lineType: "horizontal",
        bgPadding: { top: 15, left: 10, right: 10, bottom: 10 },
        padding: 15,
        titleColor: "#59039c"
      },
      connector: { type: "line" }
    },
    summary: "Adds a line along the note",
    img: "a-callout.png"
  },
  AnnotationCalloutElbow: {
    typeSettings: {
      note: { lineType: "horizontal" },
      connector: { type: "elbow" }
    },
    summary: "Keeps connector at 45 and 90 degree angles",
    img: "a-elbow.png"
  },
  AnnotationCalloutCircle: {
    typeSettings: {
      note: { lineType: "horizontal" },
      connector: { type: "elbow" }
    },
    summary: "Subject options: radius, innerRadius, outerRadius, ",
    summaryCont: "radiusPadding",
    subject: {
      radius: 50,
      radiusPadding: 5
    },
    img: "a-circle.png"
  },
  AnnotationCalloutRect: {
    typeSettings: {
      note: { lineType: "horizontal" },
      connector: { type: "elbow" }
    },
    summary: "Subject options: width, height",
    subject: {
      width: -50,
      height: 100
    },
    img: "a-rect.png"
  },
  AnnotationCalloutCurve: {
    typeSettings: {
      note: { lineType: "horizontal" },
      connector: { type: "curve" }
    },
    summary: "Connector options: curve, ",
    summaryCont: "points(array of [x,y]s or number)",
    img: "a-curve.png"
  },
  AnnotationXYThreshold: {
    typeSettings: {
      note: { lineType: "horizontal" },
      connector: { type: "elbow" }
    },
    summary: "Subject options: x1, x2 or y1, y2",
    subject: {
      x1: 0,
      x2: 1000
    },
    img: "a-threshold.png"
  },
  AnnotationBadge: {
    typeSettings: {
      note: { lineType: "horizontal" },
      connector: { type: "elbow" }
    },
    summary: "Subject options: radius, text, x:left or right, y:top or bottom",
    subject: {
      radius: 14,
      text: "A"
    },
    img: "a-badge.png"
  },
  AnnotationBracket: {
    typeSettings: {
      note: {},
      connector: { type: "elbow" }
    },
    summary: "Subject options: height or width, depth, type (square or curly)",
    subject: {
      height: 100,
      type: "square"
    },
    img: "a-bracket.png"
  },
  AnnotationCalloutCustom: {
    typeSettings: {
      note: { lineType: "horizontal" },
      connector: { type: "elbow" }
    },
    summary: "Subject options: radius, text, x:left or right, y:top or bottom",
    subject: {
      radius: 40,
      custom: PuppersIcon(),
      customID: "puppers",
      transform: "translate(-32, -32)"
    },
    img: "a-custom.png"
  }
}

const typesOrder = [
  "AnnotationLabel",
  "AnnotationCallout",
  "AnnotationCalloutElbow",
  "AnnotationCalloutCurve",
  "AnnotationCalloutCircle",
  "AnnotationCalloutRect",
  "AnnotationXYThreshold",
  "AnnotationBracket",
  "AnnotationCalloutCustom",
  "AnnotationBadge"
]

export default class Types extends React.Component {
  state = {
    name: "AnnotationLabel",
    description: types.AnnotationLabel.summary,
    editMode: true,
    connector: {},
    note: {},
    subject: {}
  }
  updateType(t) {
    this.setState({
      name: t,
      description: types[t].summary,
      connector: {},
      note: {},
      subject: {}
    })
  }

  updateNote(property, value) {
    const settings = Object.assign({}, this.state.note)
    settings[property] = value
    this.setState({
      note: settings
    })
  }

  updateConnector(property, value) {
    const settings = Object.assign({}, this.state.connector)
    settings[property] = value
    this.setState({
      connector: settings
    })
  }

  updateSubject(property, value) {
    const settings = Object.assign({}, this.state.subject)
    settings[property] = value
    this.setState({
      subject: settings
    })
  }

  render() {
    const name = this.state.name
    const imgs = typesOrder.map(i => {
      const t = types[i]
      return (
        <img
          key={i}
          alt={t.img}
          className={`icon ${name === i ? "selected" : ""}`}
          onClick={this.updateType.bind(this, i)}
          src={`img/${t.img}`}
        />
      )
    })

    const Annotation = Annotations[name]
    const t = types[name]
    const subject = this.state.subject
    const connector = this.state.connector

    const note = Object.assign(
      {},
      {
        title: "Annotations :)",
        label: "Longer text to show text wrapping"
      },
      t.typeSettings.note,
      this.state.note
    )

    const subjectJoined = Object.assign({}, t.subject, subject)
    const connectorJoined = Object.assign(
      {},
      t.typeSettings.connector,
      connector
    )

    const noteJoined = Object.assign({}, t.typeSettings.note, this.state.note)

    const ConnectorCode = () => {
      const c =
        connectorJoined.type === "line"
          ? "ConnectorLine"
          : connectorJoined.type === "elbow"
          ? "ConnectorElbow"
          : "ConnectorCurve"

      const e =
        connectorJoined.end === "arrow"
          ? "ConnectorEndArrow"
          : connectorJoined.end === "dot"
          ? "ConnectorEndDot"
          : undefined

      if (e) {
        return `
          <${c} >
            <${e} />
          </${c} >
        `
      }
      return `<${c} />`
    }

    const SubjectCode = () => {
      if (!t.subject) {
        return ""
      }

      const s =
        name === "AnnotationCalloutCircle"
          ? "SubjectCircle"
          : name === "AnnotationXYThreshold"
          ? "SubjectThreshold"
          : name === "AnnotationBadge"
          ? "SubjectBadge"
          : name === "AnnotationCalloutRect"
          ? "SubjectRect"
          : undefined

      if (s) {
        return `<${s} />`
      }
    }

    let orientation

    if (!noteJoined.lineType) {
      orientation = (
        <div>
          <p>Orientation</p>
          <img
            className={`tiny-icon ${
              note.orientation === "topBottom" ? "selected" : ""
            }`}
            onClick={this.updateNote.bind(this, "orientation", "topBottom")}
            src="img/topBottom.png"
          />
          <img
            className={`tiny-icon ${
              note.orientation === "leftRight" ? "selected" : ""
            }`}
            onClick={this.updateNote.bind(this, "orientation", "leftRight")}
            src="img/leftRight.png"
          />
        </div>
      )
    }

    let alignFirst = "left"
    let alignSecond = "right"

    if (
      noteJoined.lineType === "vertical" ||
      noteJoined.orientation === "leftRight"
    ) {
      alignFirst = "top"
      alignSecond = "bottom"
    }

    let bracketType

    if (this.state.name === "AnnotationBracket") {
      bracketType = (
        <div style={{ position: "absolute", top: 20, right: 30 }}>
          <FloatingActionButton
            onTouchTap={this.updateSubject.bind(this, "type", "square")}
            mini={true}
            secondary={this.state.subject.type === "curly" ? true : false}
            iconStyle={{
              color: "white",
              lineHeight: ".8em",
              fontSize: "1.4em"
            }}
          >
            {"]"}
          </FloatingActionButton>
          <FloatingActionButton
            onTouchTap={this.updateSubject.bind(this, "type", "curly")}
            mini={true}
            secondary={this.state.subject.type !== "curly" ? true : false}
            iconStyle={{
              color: "white",
              lineHeight: ".8em",
              fontSize: "1.4em"
            }}
          >
            {"}"}
          </FloatingActionButton>
        </div>
      )
    }

    return (
      <div>
        <Card className="types-ui" initiallyExpanded={true}>
          <CardHeader
            title="Presets"
            style={{ fontWeight: "bold", borderBottom: "1px solid #d6daea" }}
          >
            <Toggle
              label="Edit Mode"
              toggled={this.state.editMode}
              onToggle={() =>
                this.setState({
                  editMode: !this.state.editMode
                })
              }
              style={{
                float: "right",
                width: 30,
                fontSize: ".8em"
              }}
            />
          </CardHeader>
          <CardTitle>{imgs}</CardTitle>
          <CardHeader
            title="Options"
            style={{
              fontWeight: "bold",
              borderTop: "1px solid #d6daea",
              borderBottom: "1px solid #d6daea"
            }}
            showExpandableButton={true}
            actAsExpander={true}
          />
          <CardText expandable={true} className="row">
            <div className="col-xs-3">
              <b>Note</b>
              <p>Line Type</p>
              <img
                className={`tiny-icon ${!note.lineType ? "selected" : ""}`}
                src="img/none.png"
                onClick={this.updateNote.bind(this, "lineType", null)}
              />
              <img
                className={`tiny-icon ${
                  note.lineType === "vertical" ? "selected" : ""
                }`}
                src="img/vertical.png"
                onClick={this.updateNote.bind(this, "lineType", "vertical")}
              />
              <img
                className={`tiny-icon ${
                  note.lineType === "horizontal" ? "selected" : ""
                }`}
                src="img/horizontal.png"
                onClick={this.updateNote.bind(this, "lineType", "horizontal")}
              />
              {orientation}
            </div>
            <div className="col-xs-3">
              <br />
              <p>Align</p>
              <img
                className={`tiny-icon ${!note.align ? "selected" : ""}`}
                src="img/dynamic.png"
                onClick={this.updateNote.bind(this, "align", null)}
              />
              <img
                className={`tiny-icon ${
                  note.align === "middle" ? "selected" : ""
                }`}
                src="img/middle.png"
                onClick={this.updateNote.bind(this, "align", "middle")}
              />
              <img
                className={`tiny-icon ${
                  note.align === alignFirst ? "selected" : ""
                }`}
                src={`img/${alignFirst}.png`}
                onClick={this.updateNote.bind(this, "align", alignFirst)}
              />
              <img
                className={`tiny-icon ${
                  note.align === alignSecond ? "selected" : ""
                }`}
                src={`img/${alignSecond}.png`}
                onClick={this.updateNote.bind(this, "align", alignSecond)}
              />
            </div>
            <div className="col-xs-3">
              <TextField
                hintText="120"
                floatingLabelFixed={true}
                floatingLabelShrinkStyle={{
                  height: 80
                }}
                fullWidth={true}
                type="number"
                onChange={(e, v) => {
                  this.setState({
                    note: Object.assign({}, this.state.note, {
                      wrap: parseInt(v) || 0
                    })
                  })
                }}
                floatingLabelText="Text Wrap (120)"
              />
              <TextField
                hintText="5"
                floatingLabelFixed={true}
                fullWidth={true}
                type="number"
                onChange={(e, v) => {
                  this.setState({
                    note: Object.assign({}, this.state.note, {
                      padding: parseInt(v) || 0
                    })
                  })
                }}
                floatingLabelText="Text Padding (5)"
              />
            </div>
            <div className="col-xs-3">
              <b>Connector</b>
              <p>Type</p>
              <img
                className={`tiny-icon ${
                  connectorJoined.type === "line" ? "selected" : ""
                }`}
                onClick={this.updateConnector.bind(this, "type", "line")}
                src="img/line.png"
              />
              <img
                className={`tiny-icon ${
                  connectorJoined.type === "elbow" ? "selected" : ""
                }`}
                onClick={this.updateConnector.bind(this, "type", "elbow")}
                src="img/elbow.png"
              />
              <img
                className={`tiny-icon ${
                  connectorJoined.type === "curve" ? "selected" : ""
                }`}
                onClick={this.updateConnector.bind(this, "type", "curve")}
                src="img/curve.png"
              />
              <p>End</p>
              <img
                className={`tiny-icon ${
                  !connectorJoined.end ? "selected" : ""
                }`}
                onClick={this.updateConnector.bind(this, "end", null)}
                src="img/none.png"
              />
              <img
                className={`tiny-icon ${
                  connectorJoined.end === "arrow" ? "selected" : ""
                }`}
                onClick={this.updateConnector.bind(this, "end", "arrow")}
                src="img/arrow.png"
              />
              <img
                className={`tiny-icon ${
                  connector.end === "dot" ? "selected" : ""
                }`}
                onClick={this.updateConnector.bind(this, "end", "dot")}
                src="img/dot.png"
              />
            </div>
          </CardText>
        </Card>
        <h3>Use {name}</h3>
        <div style={{ position: "relative" }}>
          {bracketType}
          <svg className="types viz">
            <g transform="translate(30,60)">
              <text className="title">{name}</text>
              <text className="summary" y={30}>
                {this.state.description}
              </text>
            </g>
            <Annotation
              x={150}
              y={170}
              dy={name === "AnnotationBracket" ? undefined : 117}
              dx={name === "AnnotationBracket" ? undefined : 162}
              editMode={this.state.editMode}
              subject={subjectJoined}
              connector={connector}
              className={t.typeSettings.className}
              color={theme.accent}
              note={note}
            />
            <text x="30" y="415" className="summary">
              Code below is ready to use with these setttings
            </text>
          </svg>
        </div>
        <Code>
          {`
        /* This code is UPDATING based on the UI selections above */  
        /* With built-in defaults */
        <${name}
          x={150}
          y={170}
          dy={117}
          dx={162}
          color={"${theme.accent}"}
          ${(t.typeSettings.className &&
            `className="${t.typeSettings.className}" `) ||
            ""}
          ${this.state.editMode ? "editMode={true}" : ""}
          ${`note={${JSON.stringify(
        Object.assign(
          {},
          {
            title: "Annotations :)",
            label: "Longer text to show text wrapping"
          },
          note
        )
      ).replace(/,/g, ",\n            ")}}`}
          ${
      connector.type || connector.end
        ? `connector={${JSON.stringify(connector)}}`
        : ""
      }
          ${t.subject ? `subject={${JSON.stringify(t.subject)}}` : ""}
        />
        //
        /* Or with composable annotation parts */
      
        <${this.state.editMode ? `EditableAnnotation` : `Annotation`}
          x={150}
          y={170}
          dy={117}
          dx={162}
          color={"${theme.accent}"}     
          
          title={"${note.title}"}
          label={"${note.label}"}
          ${(t.typeSettings.className &&
            `className="${t.typeSettings.className}"`) ||
            ""}
          ${(t.subject
        ? Object.keys(t.subject).map(
          k =>
            `\n          ${k}=${
              k !== "text" ? `{${t.subject[k]}}` : `"${t.subject[k]}"`
            }`
        )
        : []
      ).join("")}
        >
          ${SubjectCode()}
          ${ConnectorCode()}
          <Note ${Object.keys(noteJoined)
        .map(k => `\n            ${k}={${JSON.stringify(noteJoined[k])}}`)
        .join("")} />
        </${this.state.editMode ? `EditableAnnotation` : `Annotation`}>
        `
            .replace(/^\s*\n/gm, "")
            .replace(/\/\//g, "\n")}
        </Code>
      </div>
    )
  }
}
