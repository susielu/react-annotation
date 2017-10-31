import React from "react"
import { PrismCode } from "react-prism"
import TypesUI from "./Types"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"

import {
  Annotation,
  EditableAnnotation,
  SubjectCircle,
  SubjectBracket,
  SubjectCustom,
  ConnectorElbow,
  ConnectorEndDot,
  BracketNote,
  Note
} from "../components/index"

import { DonutIcon } from "./Icons"
import theme from "./theme"
import { dedent } from "dentist"
import ReactMarkdown from "react-markdown"
import AlertIcon from "material-ui/svg-icons/alert/error-outline"

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
      <svg height={300} className="viz">
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

export function InPractice() {
  const source = `
  
  ### Customize the Subject by picking a base annotation

  
  ### Selecting Elements
  
  - All of the visible shapes (aside from the edit handles) in the default annotations are **paths**
  - There is an invisible rect (${"`rect.annotation-note-bg`"}) behind the text in the notes as a helper for more click area etc.
  - Hierarchy of classes:
  ![Annotation classes](img/classes.png)
  - Within the g.annotation-note-content there could be three additional elements: ${"`text.annotation-note-label`"}, ${"`text.annotation-note-title`"}, ${"`rect.annotation-note-bg`"}
  
  ### Basic Styles
  
  The library comes with default styles, on the annotation components. You can override these styles with CSS. There is also a color property on annotations that will easily change the color of the entire annotation.
  
  ### Tips
  
  - In addition to the alignment settings for the note, you can also use the css ${"`text-anchor`"} attribute to align the text within the note

  - If you are importing custom fonts, you may notice the annotations don't load perfectly with text wrapping and alignment. To fix that you can use, ${"`document.fonts.ready`"} to make sure the fonts are loaded first to reflect the custom font's spacing for all of the calculations. Here's an example:
  `
  return (
    <section>
      <Title text="API Built-in Types" id="api-built-in" />
      <ReactMarkdown source={source} />
    </section>
  )
}

export function Examples() {
  return (
    <section>
      <Title text="Examples" id="examples" />
    </section>
  )
}

export function API() {
  const source1 = `  
  All annotations are made of just three parts, a **note**, a **connector**, and a **subject**.
  
  <img alt="Anatomy of an annotation" src="img/anatomy.png" />
  
  They are the foundational blocks of this library.
  annotation.**annotations([ objects ])**
  
  ### **_Composable Annotations_**
  When using composable annotations, you have an Annotation component, a subject, a connector, and a note are its children.
  
  You can see this as the second half of code snippet in the [Annotation Types UI]("#annotation-types"), and the [Extending Types]("#extending-types) sections.
  
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

  - TODO: create callback functions here

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

  **&lt;ConnectorEndDot />** no additiona props
  



  - **note (object)**: You can specify a title and label property here. All of the annotation types that come with d3-annotation have built in functionality to take the title and the label and add them to the note, however the underlying system is composable in a way that you could customize the note to contain any type of content. You can also use this to overwrite the default note properties (align, orientation, lineType, wrap, padding) in the type. For example if on one of the notes you wanted to align it differently. In v2.1.0 and higher you can pass a regex or string to customize the wrapping <code>{ wrapSplitter: /\\n/ }</code> 
  - **connector (object)**: Some connectors such as the curve connector require additional parameters to set up the annotation. You can also use this to overwrite the default connector properties (type, end) in the type. For example if you wanted to add an arrow to the end of some of the annotations in the array you could add <code>{ end: "arrow" }</code> to this connector property on the relevant annotations. In v2.1.0 and higher, there is also a <code>{ endScale: 2 }</code> that allows you to scale the size of the <code>dot</code> or <code>arrow</code> end types
  - **subject (object)**: Some subjects such as the circle require additional parameters to set up the annotation. 
  


  - **disable ([string])**: takes the values 'connector', 'subject', and 'note' pass them in this array if you want to disable those parts from rendering


  If you don't pass anything to this function, it returns the current array of annotations.


  annotation.**editMode(boolean)**
  
  If this is true, then the annotation will create handles for parts of the annotation that are draggable. You can style these handles with the <code>circle.handle</code> selector. If you are hooking this up to a button, you will need to run the update function below, after changing the editMode. Example in [Map with Tooltips and Edit Mode](#map)
  
  annotation.**update()**
  
  Redraws all of the annotations. Typcially used to reflect updated settings. If you are only updating the position (x, y) or the offset (dx, dy) you do not need to run ${"`call`"} on makeAnnotations afterwards. Example in [Layout - Encircling Annotation](#encircle).
  
  annotation.**updateText()**
  
  If you only want to update the text then use this function. It will re-evaluate with the new text and text wrapping settings. This is separated from the ${"`update()`"} function for flexibility with performance. If you call the entire set again it will run both functions.
  
  annotation.**updatedAccessors()**
  
  Redraws all the annotations with updated accessor scales. Example in [Responsive with Types and Hover](#responsive)
  
  annotation.**type( d3annotationType )**
  You can pass different types into the annotation objects themselves, but you can also set a default type here. If you want to change the type, you will need to re-call the d3.annotation function on your element to recreate the annotations with the new type. Example in [Responsive with Types and Hover](#responsive)
  
  
  annotation.**json()**
  
  You can run this in the developer console and it will print out the current annotation settings and copy them to your clipboard. Please note that in the console each annotation will also include the type that you've associated with it.
  
  annotation.**collection()**
  
  Access to the collection of annotations with the instantiated types.
  
  annotation.**textWrap()**
  Change the overall textWrap, otherwise in the annotation object array you can change each individual one with the <code>{note: {wrap: 30}}</code> property. This function calls ${"`updateText()`"} internally so you do not need to call both functions when updating ${"`textWrap`"}.
  
  annotation.**notePadding()**
  Change the overall notePadding, otherwise in the annotation object array you can change each individual one with the <code>{note: {padding: 30}}</code> property
  
  annotation.**disable()**
  Takes the values 'connector', 'subject', and 'note' pass them in this array if you want to disable those parts from rendering
  
  annotation.**on()**
  Takes the values 'subjectover', 'subjeout', 'subjectclick', 'connectorover', 'connectout', 'connectorclick', 'noteover', 'noteout', 'notecclick', 'dragend', 'dragstart' as custom dispatch events you can hook into. 


  **AnnotationCalloutCircle**
  - radius or outerRadius and innerRadius: Number, pixels
  - radiusPadding: Number, pixels
  
  **AnnotationCalloutRect**
  - width: Number, pixels
  - height: Number, pixels
  
  **AnnotationXYThreshold**
  - x1, x2 or y1, y2: Number, pixels

  **AnnotationCalloutCustom**
  - custom: Array, JSX SVG elements to create the custom subject shape
  - customID (required):a custom DOM Element ID for masking the connector with the subject
  - transform: String, for offsetting the subject so it can be centered
  
  **AnnotationBracket**
  - width or height: Number, pixels
  - depth: Number, pixels depending on +/- it will determine which way the bracket extrudes from
  - type: String, "square" (default), or "curly"

  **AnnotationBadge**: this is the only base annotation that doesn't have a connector or note
  - text: String
  - radius: Number, pixels
  - x: "left" or "right"
  - y: "top" or "bottom"
  
  **No subject**
  - AnnotationLabel
  - AnnotationCallout
  - AnnotationCalloutElbow
  - AnnotationCalloutCurve
  
  
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
