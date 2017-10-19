import React from "react"
import { PrismCode } from "react-prism"
import TypesUI from "./Types"
import {
  Annotation,
  SubjectCircle,
  ConnectorElbow,
  ConnectorEndDot,
  Note
} from "../components/index"

import { DonutIcon } from "./Icons"
import theme from "./theme"
import { dedent } from "dentist"

const Title = ({ text, id }) => {
  return (
    <h2>
      <a href={`#${id}`}>#</a> {text}
    </h2>
  )
}

export const Code = ({ children }) => {
  return (
    <pre>
      <PrismCode className="language-jsx">{dedent(children)}</PrismCode>
    </pre>
  )
}

export function Introduction() {
  return (
    <section>
      <Title text="Introduction" id="introduction" />
      <p>
        Annotations{" "}
        <strong>
          establish context, and direct our users to insights and anomalies
        </strong>. I made{" "}
        <a href="http://d3-annotation.susielu.com/">d3-annotation</a> to tackle
        this problem, however our team uses React more and more. Due to easier
        composability and performance, I've re-made that library as a React
        module.
      </p>

      <p>
        Use react-annotation with built-in annotation types, or extend it to
        make custom annotations. It is made for SVG.
      </p>
      <p>
        Contact me through the{" "}
        <a href="https://github.com/susielu/react-annotation/">
          github repo
        </a>{" "}
        or <a href="https://twitter.com/DataToViz">twitter</a>.
      </p>
    </section>
  )
}

export function Setup() {
  return (
    <section>
      <Title text={"Setup"} id="setup" />
      <h3>Using NPM</h3>
      <p>You can add the react-annotation as a node module by running</p>

      <Code>{"npm i react-annotation -S"}</Code>
    </section>
  )
}

export function Types() {
  return (
    <section>
      <Title text="Annotation Types" id="types" />
      <TypesUI />
    </section>
  )
}

export function ExtendingTypes() {
  return (
    <section>
      <Title text="Extending Types" id="extending-types" />
      <p>
        In react-annotation it is easy to add custom elements to an annotation.
        All annotations are composable with the different subjects, connectors,
        and a note.
      </p>
      <svg height={300}>
        <Annotation
          x={100}
          y={100}
          dx={100}
          dy={50}
          radius={35}
          color={theme.accent}
          title="Custom annotation"
          label="A donut a day is just really cute"
        >
          <SubjectCircle />
          <DonutIcon />
          <ConnectorElbow>
            <ConnectorEndDot />
          </ConnectorElbow>
          <circle fill={theme.accent} cx={100} cy={50} r={3} />
          <Note align="middle" lineType="vertical" padding={10} />
        </Annotation>
      </svg>
      <Code>
        {`
        <Annotation
        x={100}
        y={100}
        dx={100}
        dy={50}
        radius={35}
        color={theme.accent}
        title="Custom annotation"
        label="A donut a day is just really cute"
      >
        <SubjectCircle />
        <DonutIcon />
        <ConnectorElbow>
          <ConnectorEndDot />
        </ConnectorElbow>
        <circle fill={theme.accent} cx={100} cy={50} r={3} />
        <Note align="middle" lineType="vertical" padding={10} />
      </Annotation>`}
      </Code>
    </section>
  )
}

// export function d3Translator () {
//   return <section>
//     <Title text=""
//   </section>
// }

export function Examples() {
  return (
    <section>
      <Title text="Examples" id="examples" />
    </section>
  )
}

export function API() {
  return (
    <section>
      <Title text="API" id="api" />
    </section>
  )
}

export function Notes() {
  return (
    <section>
      <Title text="Notes" id="notes" />
    </section>
  )
}
