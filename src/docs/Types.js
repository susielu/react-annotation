import React from "react"
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card"
import Toggle from "material-ui/Toggle"

const types = {
  AnnotationLabel: {
    typeSettings: {
      note: { align: "middle", orientation: "topBottom" },
      connector: { type: "line" }
    },
    summary: "A centered label annotation",
    img: "a-label.png"
  },
  AnnotationCallout: {
    typeSettings: {
      note: { align: "dynamic", lineType: "horizontal" },
      connector: { type: "line" }
    },
    summary: "Adds a line along the note",
    img: "a-callout.png"
  },
  AnnotationCalloutElbow: {
    typeSettings: {
      note: { align: "dynamic", lineType: "horizontal" },
      connector: { type: "elbow" }
    },
    summary: "Keeps connector at 45 and 90 degree angles",
    img: "a-elbow.png"
  },
  AnnotationCalloutCircle: {
    typeSettings: {
      note: { align: "dynamic", lineType: "horizontal" },
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
      note: { align: "dynamic", lineType: "horizontal" },
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
      note: { align: "dynamic", lineType: "horizontal" },
      connector: { type: "curve" }
    },
    summary: "Connector options: curve, ",
    summaryCont: "points(array of [x,y]s or number)",
    img: "a-curve.png"
  },
  AnnotationXYThreshold: {
    typeSettings: {
      note: { align: "dynamic", lineType: "horizontal" },
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
      note: { align: "dynamic", lineType: "horizontal" },
      connector: { type: "elbow" }
    },
    summary: "Subject options: radius, text, x:left or right, y:top or bottom",
    subject: {
      radius: 14,
      text: "A"
    },
    img: "a-badge.png"
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
  "AnnotationBadge"
]

export default class Types extends React.Component {
  state = {
    name: "AnnotationLabel",
    description: types["AnnotationLabel"].summary
  }

  updateType(t) {
    this.setState({
      name: t,
      description: types[t].summary
    })
  }

  render() {
    const imgs = typesOrder.map(i => {
      const t = types[i]
      return (
        <img
          className={`icon ${this.state.name === i ? "selected" : ""}`}
          onClick={this.updateType.bind(this, i)}
          src={`img/${t.img}`}
        />
      )
    })
    return (
      <div>
        <Card className="types-ui" expanded={true}>
          <CardHeader
            title="Presets"
            style={{ fontWeight: "bold", borderBottom: "1px solid #d6daea" }}
          >
            <Toggle
              label="Edit Mode"
              defaultToggled={true}
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
              <p>Orientation</p>
            </div>
            <div className="col-xs-3">
              <br />
              <p>Align</p>
            </div>
            <div className="col-xs-3">
              <p>text wrap</p>
            </div>
            <div className="col-xs-3">
              <b>Connector</b>
              <p>Type</p>
              <p>End</p>
            </div>
          </CardText>
        </Card>
        <h3>Use {this.state.name}</h3>
        <svg className="types">
          <g transform="translate(30,60)">
            <text className="title">{this.state.name}</text>
            <text className="summary" y={30}>
              {this.state.description}
            </text>
          </g>
        </svg>
      </div>
    )
  }
}
