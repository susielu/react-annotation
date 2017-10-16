import React from "react"
import { PrismCode } from "react-prism"

const Title = ({ text, id }) => {
  return (
    <h2>
      <a href={`#${id}`}>#</a> {text}
    </h2>
  )
}

const Code = ({ children }) => {
  return (
    <pre>
      <PrismCode className="language-jsx">{children}</PrismCode>
    </pre>
  )
}

export function Introduction() {
  return (
    <section>
      <Title text="Introduction" id="introduction" />
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
