import React from "react"

import { scaleTime, scaleLinear } from "d3-scale"
import { line } from "d3-shape"
import { extent, max } from "d3-array"
import stock from "./data/stock.json"
import theme from "./theme"
import {
  AnnotationCalloutCircle,
  AnnotationBadge,
  AnnotationLabel,
  AnnotationXYThreshold
} from "../components/index"
import { Code } from "./Sections"
import yearNetwork from "./data/yearNetwork.json"

export class Tooltip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  render() {
    // line chart code: https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
    // time series from: http://bl.ocks.org/mbostock/3883245
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 30, left: 20 },
      height = 500 - margin.top - margin.bottom
    let width = 860 - margin.left - margin.right

    const x = scaleTime().range([0, width])
    const y = scaleLinear().range([height, 0])

    const valueline = line()
      .x(d => x(d.date))
      .y(d => y(d.close))

    stock.forEach(function(d) {
      d.date = new Date(d.date)
      d.close = +d.close
    })

    x.domain(extent(stock, d => d.date))
    y.domain([0, max(stock, d => d.close)])

    //Add annotations
    const labels = [
      {
        data: { date: "9-Apr-12", close: 636.23 },
        dy: 37,
        dx: -142
      },
      {
        data: { date: "26-Feb-08", close: 119.15 },
        dy: -137,
        dx: 0,
        note: { align: "middle" }
      },
      {
        data: { date: "18-Sep-09", close: 185.02 },
        dy: 37,
        dx: 42
      }
    ].map(l => {
      l.x = x(new Date(l.data.date))
      l.y = y(l.data.close)
      l.note = Object.assign({}, l.note, {
        title: `Close: ${l.data.close}`,
        label: `${l.data.date}`
      })
      l.subject = { radius: 4 }

      return l
    })

    const annotations = labels.map((a, i) => (
      <g key={i}>
        <AnnotationCalloutCircle
          dx={a.dx}
          dy={a.dy}
          className={this.state.hover === i ? "" : "hidden"}
          color={theme.accent}
          x={a.x}
          y={a.y}
          note={a.note}
          subject={a.subject}
        />
        <circle
          fill="#9610ff"
          r={5}
          cx={a.x}
          cy={a.y}
          onMouseOver={() =>
            this.setState({
              hover: i
            })}
          onMouseOut={() =>
            this.setState({
              hover: null
            })}
        />
      </g>
    ))

    return (
      <div>
        <h3>Basic Circle Callouts</h3>
        <a href="https://codepen.io/susielu/pen/wrNRRK?editors=0010#0">
          Explore in CodePen
        </a>
        <svg width={860} height={500}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g transform="translate(20, 20)">
              <text>Hover over the dots to see more information</text>
              <text y={30}>
                Uses react-annotation's AnnotationCallout to make a tooltip
              </text>
            </g>
            <line x2={width} y1={height} y2={height} stroke="grey" />

            <line y1={0} y2={height} stroke="grey" />
            <path d={valueline(stock)} stroke="#ddd" fill="none" />
            {annotations}
          </g>
        </svg>
        <Code>
          {`

 const margin = { top: 20, right: 20, bottom: 30, left: 50 },
    height = 500 - margin.top - margin.bottom
  let width = 860 - margin.left - margin.right

  const x = scaleTime().range([0, width])
  const y = scaleLinear().range([height, 0])

  const valueline = line()
    .x(d => x(d.date))
    .y(d => y(d.close))

  stock.forEach(function(d) {
    d.date = new Date(d.date)
    d.close = +d.close
  })

  x.domain(extent(stock, d => d.date))
  y.domain([0, max(stock, d => d.close)])

  //Add annotations
  const labels = [
    {
      data: { date: "9-Apr-12", close: 636.23 },
      dy: 37,
      dx: -142
    },
    {
      data: { date: "26-Feb-08", close: 119.15 },
      dy: -137,
      dx: 0,
      note: { align: "middle" }
    },
    {
      data: { date: "18-Sep-09", close: 185.02 },
      dy: 37,
      dx: 42
    }
  ].map(l => {
    l.x = x(new Date(l.data.date))
    l.y = y(l.data.close)
    l.note = Object.assign({}, l.note, {
      title: \`Close: \${l.data.close}\`,
      label: \`\${l.data.date}\`
    })
    l.subject = { radius: 4 }

    return l
  })

  const annotations = labels.map((a, i) => (
    <g>
      <AnnotationCalloutCircle
        dx={a.dx}
        dy={a.dy}
        className={this.state.hover === i ? "" : "hidden"}
        color={theme.accent}
        x={a.x}
        y={a.y}
        note={a.note}
        subject={a.subject}
      />
      <circle
        fill="#9610ff"
        r={5}
        cx={a.x}
        cy={a.y}
        onMouseOver={() =>
          this.setState({
            hover: i
          })}
        onMouseOut={() =>
          this.setState({
            hover: null
          })}
      />
    </g>
  ))

  return (
      <svg width={860} height={500}>
        <g transform={\`translate(\${margin.left}, \${margin.top})\`}>
          <g transform="translate(20, 20)">
            <text>Hover over the dots to see more information</text>
            <text y={30}>
              Uses react-annotation's AnnotationCallout to make a tooltip
            </text>
          </g>
          <line x2={width} y1={height} y2={height} stroke="grey" />

          <line y1={0} y2={height} stroke="grey" />
          <path d={valueline(stock)} stroke="#ddd" fill="none" />
          {annotations}
        </g>
      </svg>
  )
`}
        </Code>
      </div>
    )
  }
}

export function Emmys() {
  const width = 960,
    height = 500,
    margin = { top: 30, right: 130, bottom: 50, left: 340 }

  const x = scaleLinear()
    .range([margin.left, width - margin.right])
    .domain([2013, 2017])
  const y = scaleLinear().range([height - margin.bottom, margin.top])
  const networkLines = yearNetwork.networkLines

  y.domain([0, Math.max(...networkLines.map(d => d.max))])
  let lineGen = line()
    .x(function(d) {
      return x(d.year)
    })
    .y(function(d) {
      return y(d.value)
    })

  const colors = {
    HBO: "black",
    Netflix: "#D32F2F",
    NBC: "#ffc107",
    "FX Networks": "#0097a7",
    ABC: "#00BFA5",
    CBS: "#00BCD4",
    FOX: "#3f51b5",
    Showtime: "#C5CAE9",
    AMC: "#D32F2F",
    PBS: "#B39DDB",
    Amazon: "#ffc107",
    "Nat Geo": "#ff9800",
    Hulu: "#00BFA5"
  }
  const highlight = ["HBO", "Netflix"]

  const lines = networkLines
    .sort((a, b) => a.total - b.total)
    .map(d => (
      <path
        key={d.network}
        className="segment"
        d={lineGen(d.line)}
        fill="none"
        stroke={colors[d.network] || "grey"}
        strokeDasharray={highlight.indexOf(d.network) !== -1 ? "none" : "2, 4"}
      />
    ))

  /* Code below relevant for annotations */
  let previousNY = 0
  const labelAnnotations = networkLines
    .sort(
      //sort annotations by last data point for ordering
      (a, b) =>
        b.line[b.line.length - 1].value - a.line[a.line.length - 1].value
    )
    .reduce((p, c) => {
      //push annotation down if it will overlap
      const ypx = y(c.line[c.line.length - 1].value)
      let ny

      if (ypx - previousNY < 10) {
        ny = previousNY + 15
      }

      p.push(
        <AnnotationLabel
          key={c.network}
          note={{ label: c.network, orientation: "leftRight", align: "middle" }}
          y={ypx}
          x={width - margin.right}
          dx={highlight.indexOf(c.network) !== -1 ? 20 : 5}
          id={c.network}
          color={colors[c.network]}
          disable={["connector"]}
          ny={ny} //use ny to directly place the note in xy space if needed
        />
      )
      previousNY = ny || ypx

      return p
    }, [])

  const axisAnnotations = networkLines
    .filter(d => d.network === "HBO")[0]
    .line.map(d => (
      <AnnotationXYThreshold
        key={d.year}
        note={{ label: d.year, align: "middle", lineType: null }}
        ny={190}
        className={"axis"}
        y={190}
        x={x(d.year)}
        subject={{
          y1: y(0),
          y2: y(d.value)
        }}
      />
    ))

  const labels = networkLines
    .filter(d => highlight.indexOf(d.network) !== -1)
    .reduce((p, c) => {
      p = p.concat(
        c.line.map(d => {
          return {
            network: c.network,
            year: d.year,
            value: d.value
          }
        })
      )
      return p
    }, [])

  const badgeAnnotations = labels.map(d => {
    return (
      <AnnotationBadge
        key={d.year + d.network}
        subject={{
          text: d.value,
          radius: 12
        }}
        color={colors[d.network]}
        x={x(d.year)}
        y={y(d.value)}
      />
    )
  })

  return (
    <div>
      <a href="https://codepen.io/susielu/pen/EbVQYL?editors=0010#0">
        Explore in CodePen
      </a>
      <div style={{ position: "relative" }}>
        <svg width={960} height={500} id="emmys">
          <g className="lineChart">
            {lines}
            {labelAnnotations}
            {axisAnnotations}
            {badgeAnnotations}
            <line
              className="basline axis"
              stroke="lightgrey"
              x1={x(2013)}
              x2={x(2017)}
              y1={y(0)}
              y2={y(0)}
            />
          </g>
        </svg>
        <div className="title">
          <b style={{ color: "#d32f2f" }}>Netflix</b> Challenges <b>HBO</b> at
          the 2017 Emmys
        </div>
      </div>
    </div>
  )
}
