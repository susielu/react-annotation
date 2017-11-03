import React from "react"

import { scaleTime, scaleLinear } from "d3-scale"
import { line } from "d3-shape"
import { extent, max } from "d3-array"
import stock from "./data/stock.json"
import theme from "./theme"
import { AnnotationCalloutCircle } from "../components/index"
import { Code } from "./Sections"

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
