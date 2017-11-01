/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import { PrismCode } from "react-prism"
import TypesUI from "./Types"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import { Tooltip } from "./Examples"

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
import ReactMarkdown from "react-markdown"
import AlertIcon from "material-ui/svg-icons/alert/error-outline"

const Title = ({ text, id }) => {
  return (
    <h2 id={id}>
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
      If you're new to using React, I suggest using react-create-app to start
      your project.
    </section>
  )
}

export function Types() {
  const source = `
  All annotations are made of just three parts, a **note**, a **connector**, and a **subject**.
  
  <img alt="Anatomy of an annotation" src="img/anatomy.png" />
  
  They are the foundational blocks of this library.`
  return (
    <section>
      <Title text="Annotation Types" id="types" />
      <ReactMarkdown source={source} />
      <TypesUI />
    </section>
  )
}

export function AnnotationTypesAPI() {
  const source = `
  ### **_Built-in Annotations_**
  Built-in annotations are a set of preset Subjects, Connectors, and Notes as seen in the [Annotation Types](#annotation-types) section.
  
  All built-in annotation types have the following props
  - **x (number)**: X position of the subject and one end of the connector
  - **y (number)**: Y position of the subject and one end of the connector
  - **dx (number)**: X Position of the note and one end of the connector, as an offset from x,y
  - **dx (number)**: Y Position of the note and one end of the connector, as an offset from x,y
  - **nx (number)**: X Position of the note and one end of the connector, as the raw x,y position **not** an offset
  - **ny (number)**: Y Position of the note and one end of the connector, as the raw x,y position **not** an offset
  - **color(string)**: only in version 2.0, you can pass a color string that will be applied to the annotation. This color can be overridden via css or inline-styles
  - **editMode(boolean)**:
  - **disable ([string])**: takes the values 'connector', 'subject', and 'note' pass them in this array if you want to disable those parts from rendering
  - **onDragStart(function)**: Passes the current props of the annotation when dragging starts
  - **onDrag(function)**: Passes the current props of the annotation while dragging 
  - **onDragEnd(function)**: Passes the current props of the annotation when dragging ends
  - **connector (object with the following properties and (values))**
    - type (string, "line", "elbow", or "curve"): 
    - end (string, "dot", or "arrow"):
    - **curve (function):** Made to use a curve function from [d3-shape](https://github.com/d3/d3-shape). Defaults to \`curveCatmullRom\`.
    - **points (array[[x,y],[x,y]...])**: Anchor points for the curve function  
    - **endScale (number)**: A multiplying factor for sizing the connector end  
  - **note (object with the following properties and (values))**: 
    - **title (string)**
    - **label (string)**
    - **padding (number)**
    - **orientation (string, "leftRight" or "topBottom")**: Determines based on the dx, and dy, which direction to orient the \`Note\`. Default is set to \`"topBottom\`
    - **lineType (string, "vertical" or "horizontal")**: Creates a line along the edge of the note text. **Please Note** if you set this to \`"vertical"\` then \`orientation\` is fixed at \`"leftRight"\` and vice versa if it is \`"horizontal"\` then \`orientation\` is fixed at \`"topBottom"\` 
    - **align (string, "left", "right", "middle", "top", "bottom", "dynamic")**: When the orientation is set to \`"topBottom"\` or lineType is set to \`"horiztonal"\` you can align the note with \`"top"\`, \`"bottom"\`, \`"middle"\`, or \`"dynamic"\`. When the orientation is set to \`"leftRight"\` or \`lineType\` is set to \`"vertical"\` you can align the note with \`"left"\`, \`"right"\`, \`"middle"\`, or \`"dynamic"\`. In addition to the alignment settings for the note, you can also use the css ${"`text-anchor`"} attribute to align the text within the note
    - **color (string)**: Color string, inherited from Annotation but can be customized by directly adding to Note as a prop
    - **wrapSplitter (string or regex)**:
  - **subject (object)**: The following section details the props that can be sent to each Annotation Type's subject property
  
  Specific variables can be sent as properties of the \`subject\` annotation

  **&lt;AnnotationCalloutCircle />**
  - **radius (number)**: Radius of circle
  - **radiusPadding (number)**: Padding outside of circle, affects space between circle stroke and start of connector
  - **innerRadius (number)**: Inner radius to make a ring annotation
  - **outerRadius (number)**: Outer radius to make a ring annotation
  
  **&lt;AnnotationCalloutRect />**
  - **width (number)**: Accepts negative and positive values
  - **height (number)**: Accepts negative and positive values
  
  
  **&lt;AnnotationXYThreshold />**
  - **x1, x2 or y1, y2 (number)**: x1, x2 for a horizontal line, y1, y2 for a vertical line

  **&lt;AnnotationCalloutCustom />**
  - **customID (string: Required)**: Needed for masking the connector by the subject, must be a unique DOM id for the entire page.
  - **custom ([array of JSX SVG shapes])**: Array of JSX SVG shapes that are used to compose the custom element.
  - **transform (SVG transform string)**: Convenience if you need to offset your custom shape
  
  **&lt;AnnotationBracket />**
  - **width or height (number)**: Using width creates a horizontal bracket, using a height creates a vertical bracket
  - **depth (number)**: How far the bracket pops out from the corners. Defaults to 20.
  - **type (string, "square" or "curly")**: Type of bracket 

  **&lt;AnnotationBadge />**: this is the only base annotation that doesn't have a connector or note
  - **text (string)**: Text placed in the center of the badge
  - **radius (number)**: Default of 14px
  - **topBottom (string, "top" or "bottom")**: Location, can be combined with leftRight to offset the badge into a corner such as the top right corner. Default places the badge in the center.
  - **leftRight (string, "left" or "right")**: Location, can be combined with topBottom to offset the badge into a corner such as the top right corner. Default places the badge in the center.
  "
  
  These built-in types do not have a Subject
  - **&lt;AnnotationLabel />**
  - **&lt;AnnotationCallout />**
  - **&lt;AnnotationCalloutElbow />**
  - **&lt;AnnotationCalloutCurve />**


  `
  return (
    <section>
      <Title text="API" id="types-api" />
      <ReactMarkdown source={source} />
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
      <svg height={300} className="viz">
        <Annotation
          x={100}
          y={100}
          dx={100}
          dy={50}
          radius={35}
          color={theme.accent}
          title="Custom annotation"
          label="Donut annotations be free!"
        >
          <DonutIcon />
          <SubjectCircle />
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

export function InPractice() {
  const source = `
  ### Selecting Elements
  
  - All of the visible shapes (aside from the edit handles) in the default annotations are **paths**
  - There is an invisible rect (${"`rect.annotation-note-bg`"}) behind the text in the notes as a helper for more click area etc.
  - Hierarchy of classes:
  ![Annotation classes](img/classes.png)
  - Within the g.annotation-note-content there could be three additional elements: ${"`text.annotation-note-label`"}, ${"`text.annotation-note-title`"}, ${"`rect.annotation-note-bg`"}
  
  ### Basic Styles
  
  There is also a color property on annotations that will easily change the color of the entire annotation.
  
  ### Tips
  
  - In addition to the alignment settings for the note, you can also use the css ${"`text-anchor`"} attribute to align the text within the note

  - If you are importing custom fonts, you may notice the annotations don't load perfectly with text wrapping and alignment. To fix that you can use, ${"`document.fonts.ready`"} to make sure the fonts are loaded first to reflect the custom font's spacing for all of the calculations. 

  ### Integration with Semiotic

  react-annotation is integrated with semiotic. If you want to use one of these annotation types you simply need to.

  ### Migrating from d3-annotation

  Differences from d3-annotation
  - Component names are capitalized so annotationLabel in d3-annotation corresponds with AnnotationLabel in react-annotation
  - There is no concept of an annotation collection. This felt unnecessary since the annotation data was being pushed into each annotation directly
  - There is no concept of accessors. The assumption is that you would make over your annotations and give them the x, y, with any type of scaling functions.
  
  If you want to update your code from d3-annotation to react-annotation, here's an example: 
  `
  return (
    <section>
      <Title text="In Practice" id="in-practice" />
      <ReactMarkdown source={source} />
    </section>
  )
}

export function Examples() {
  return (
    <section>
      <Title text="Examples" id="examples" />
      <Tooltip />
    </section>
  )
}

export function API() {
  const source1 = `  

  
  
  ### **_Composable Annotations_**
  When using composable annotations, you have an Annotation component, a subject, a connector, and a note are its children.
  
  Examples are in the [Annotation Types UI]("#annotation-types"), and the [Extending Types]("#extending-types) sections.
  
  ### Annotation
  **&lt;Annotation />**

  - **x (number)**: X position of the subject and one end of the connector
  - **y (number)**: Y position of the subject and one end of the connector
  - **dx (number)**: X Position of the note and one end of the connector, as an offset from x,y
  - **dx (number)**: Y Position of the note and one end of the connector, as an offset from x,y
  - **nx (number)**: X Position of the note and one end of the connector, as the raw x,y position **not** an offset
  - **ny (number)**: Y Position of the note and one end of the connector, as the raw x,y position **not** an offset
  - **color(string)**: only in version 2.0, you can pass a color string that will be applied to the annotation. This color can be overridden via css or inline-styles

   **&lt;EditableAnnotation />**
  
  All the same props as \`Annotation\`, with built in anchors for dragging the annotation

  - **onDragStart(function)**: Passes the current props of the annotation when dragging starts
  - **onDrag(function)**: Passes the current props of the annotation while dragging 
  - **onDragEnd(function)**: Passes the current props of the annotation when dragging ends

  ### Subjects

`

  const source3 = `
**&lt;SubjectCircle />** 
  - **radius (number)**: Radius of circle
  - **radiusPadding (number)**: Padding outside of circle, affects space between circle stroke and start of connector
  - **innerRadius (number)**: Inner radius to make a ring annotation
  - **outerRadius (number)**: Outer radius to make a ring annotation

  **&lt;SubjectRect />**
  - **width (number)**: Accepts negative and positive values
  - **height (number)**: Accepts negative and positive values
  

  **&lt;SubjectThreshold />**
  - **x1, x2 or y1, y2 (number)**: x1, x2 for a horizontal line, y1, y2 for a vertical line
  
  **&lt;SubjectCustom />**
  - **customID (string: Required)**: Needed for masking the connector by the subject, must be a unique DOM id for the entire page.
  - **custom ([array of JSX SVG shapes])**: Array of JSX SVG shapes that are used to compose the custom element.
  - **transform (SVG transform string)**: Convenience if you need to offset your custom shape

  **&lt;SubjectBracket />**
  - **width or height (number)**: Using width creates a horizontal bracket, using a height creates a vertical bracket
  - **depth (number)**: How far the bracket pops out from the corners. Defaults to 20.
  - **type (string, "square" or "curly")**: Type of bracket 

  **&lt;SubjectBadge />**
  - **text (string)**: Text placed in the center of the badge
  - **radius (number)**: Default of 14px
  - **topBottom (string, "top" or "bottom")**: Location, can be combined with leftRight to offset the badge into a corner such as the top right corner. Default places the badge in the center.
  - **leftRight (string, "left" or "right")**: Location, can be combined with topBottom to offset the badge into a corner such as the top right corner. Default places the badge in the center.
  
  ### Connectors

  All connectors are automatically passed the x,y and dx,dy positions from \`Annotation\`.  

  - **x (number)**: X position of the subject and one end of the connector
  - **y (number)**: Y position of the subject and one end of the connector
  - **dx (number)**: X Position of the note and one end of the connector, as an offset from x,y
  - **dx (number)**: Y Position of the note and one end of the connector, as an offset from x,y

  All connectors have this 
  - **connectorProps (object)**: any additional props on the group element containing the note. For example this is where you could attach mouseover events.

  **&lt;ConnectorLine />** no additional props


  **&lt;ConnectorElbow />** no additional props


  **&lt;ConnectorCurve />**
  - **curve (function):** Made to use a curve function from [d3-shape](https://github.com/d3/d3-shape). Defaults to \`curveCatmullRom\`.
  - **points (array[[x,y],[x,y]...])**: Anchor points for the curve function


  ### ConnectorEnds
  Passed as children to \`Connectors\` to add an arrow or dot to the end of a connector

  All connector ends have a \`scale\` property to adjust the size.

  - **scale (number)**: A multiplying factor for sizing the connector end

  **&lt;ConnectorEndArrow />** no additional props

  **&lt;ConnectorEndDot />** no additional props
  
  - Default dot is a circle with a radius of 3.
  
  ### Notes

  **&lt;Note />**
  - **title (string)**
  - **label (string)**
  - **padding (number)**
  - **orientation (string, "leftRight" or "topBottom")**: Determines based on the dx, and dy, which direction to orient the \`Note\`. Default is set to \`"topBottom\`
  - **lineType (string, "vertical" or "horizontal")**: Creates a line along the edge of the note text. **Please Note** if you set this to \`"vertical"\` then \`orientation\` is fixed at \`"leftRight"\` and vice versa if it is \`"horizontal"\` then \`orientation\` is fixed at \`"topBottom"\` 
  
  - **align (string, "left", "right", "middle", "top", "bottom", "dynamic")**: When the orientation is set to \`"topBottom"\` or lineType is set to \`"horiztonal"\` you can align the note with \`"top"\`, \`"bottom"\`, \`"middle"\`, or \`"dynamic"\`. When the orientation is set to \`"leftRight"\` or \`lineType\` is set to \`"vertical"\` you can align the note with \`"left"\`, \`"right"\`, \`"middle"\`, or \`"dynamic"\`. In addition to the alignment settings for the note, you can also use the css ${"`text-anchor`"} attribute to align the text within the note
  - **color (string)**: Color string, inherited from Annotation but can be customized by directly adding to Note as a prop
 - **wrapSplitter (string or regex)**:
 - **gProps (object)**: any additional props on the group element containing the note. For example this is where you could attach mouseover events.

  **&lt;BracketNote />** use with &lt;SubjectBracket />
  - This Note has all of the same properties as the regular Note, except it has dynamic positioning of the dx, and dy depending on the settings given to \`SubjectBracket\`

  `
  return (
    <section>
      <Title text="API" id="api" />
      <ReactMarkdown source={source1} />
      <Chip>
        <Avatar backgroundColor={theme.accent} icon={<AlertIcon />} />
        Please Note
      </Chip>
      <p>
        Subjects are a special case because their attributes affect both the
        subject and the connector. The use the components below with the
        Annotation components, you should pass these props to{" "}
        <code>Annotation</code>, which the sends them down to the{" "}
        <code>Subject</code>. For Example:{" "}
      </p>
      <Code>{`
      <Annotation
        x={20}
        y={100}
        dx={20}
        
        //Subject props given to annotation.
        //They are passed down to the Subject.
        radius={30}
      >
        <SubjectCircle />
      </Annotation>
      `}</Code>
      <ReactMarkdown source={source3} />
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
