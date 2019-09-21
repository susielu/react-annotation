/* eslint-disable no-unused-vars */
import React from "react"
/* eslint-enable no-unused-vars */
import { PrismCode } from "react-prism"
import TypesUI from "./Types"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import { Tooltip, Emmys } from "./Examples"

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
        </strong>
        . I made <a href="http://d3-annotation.susielu.com/">d3-annotation</a>{" "}
        to tackle this problem, however most of our apps are built in React. The
        design is heavily based on d3-annotation, with{" "}
        <a href="#migrating">a few differences</a>, two new annotation types,
        and easy to compose annotations.
      </p>

      <p>
        Use react-annotation with built-in annotation types, or extend it to
        make custom annotations. It is made for SVG.
      </p>
      <p>
        Contact me through the{" "}
        <a href="https://github.com/susielu/react-annotation/">github repo</a>{" "}
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
      <p>You can add the react-annotation as a node module by running:</p>
      <Code>{"npm i react-annotation -S"}</Code>
      If you're new to using React, I suggest using{" "}
      <a href="https://github.com/facebookincubator/create-react-app">
        react-create-app
      </a>{" "}
      to start your project.
    </section>
  )
}

export function Types() {
  const source = `
  All annotations are made of just three parts, a **note**, a **connector**, and a **subject**.
  
  <img alt="Anatomy of an annotation" src="img/anatomy.png" />
  
  They are the foundational blocks of this library. Explore the UI below to understand the built-in types.
  `

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
  Built-in annotations are a set of preset Subjects, Connectors, and Notes as seen in the [Annotation Types](#types) section.
  
  All built-in annotation types have the following props
  - **x (number)**: X position of the subject and one end of the connector
  - **y (number)**: Y position of the subject and one end of the connector
  - **dx (number)**: X Position of the note and one end of the connector, as an offset from x,y
  - **dx (number)**: Y Position of the note and one end of the connector, as an offset from x,y
  - **nx (number)**: X Position of the note and one end of the connector, as the raw x,y position **not** an offset
  - **ny (number)**: Y Position of the note and one end of the connector, as the raw x,y position **not** an offset
  - **color(string)**: A color string that will be applied to the annotation. This color can be overridden via css
  - **events(object)**: An object with [react event handlers](https://reactjs.org/docs/handling-events.html) as keys and functions to handle those events. Each handler is bound with the annotation context and has the prarameters: annotation props, annotation state, event
  - **editMode(boolean)**: Turns on handles for moving annotations, the following are only trigged with editMode on:
    - **onDragStart(function)**: Passes the current props of the annotation when dragging starts
    - **onDrag(function)**: Passes the current props of the annotation while dragging 
    - **onDragEnd(function)**: Passes the current props of the annotation when dragging ends
  - **disable ([string])**: takes the values 'connector', 'subject', and 'note'. Pass them in this array if you want to disable those parts from rendering
  - **connector (object with the following properties and (values))**
    - **type (string, "line", "elbow", or "curve")** 
    - **end (string, "dot", or "arrow")**
    - **curve (function):** Made to use a curve function from [d3-shape](https://github.com/d3/d3-shape). Defaults to \`curveCatmullRom\`.
    - **points (array[[x,y],[x,y]...])**: Anchor points for the curve function  
    - **endScale (number)**: A multiplying factor for sizing the connector end  
  - **note (object with the following properties and (values))**: 
    - **title (string)**
    - **label (string)**
    - **padding (number)**
    - **bgPadding (number or Object with one or more options of top, bottom, left, or right)**: this allows you to add more of a padding to the rectangle behind the text element, only available in version 1.3.0 and higher
    - **orientation (string, "leftRight" or "topBottom")**: Determines based on the dx, and dy, which direction to orient the \`Note\`. Default is set to \`"topBottom"\`
    - **lineType (string, "vertical" or "horizontal")**: Creates a line along the edge of the note text. **Please Note** if you set this to \`"vertical"\` then \`orientation\` is fixed at \`"leftRight"\` and vice versa if it is \`"horizontal"\` then \`orientation\` is fixed at \`"topBottom"\` 
    - **align (string, "left", "right", "middle", "top", "bottom", "dynamic")**: When the orientation is set to \`"topBottom"\` or lineType is set to \`"horiztonal"\` you can align the note with \`"top"\`, \`"bottom"\`, \`"middle"\`, or \`"dynamic"\`. When the orientation is set to \`"leftRight"\` or \`lineType\` is set to \`"vertical"\` you can align the note with \`"left"\`, \`"right"\`, \`"middle"\`, or \`"dynamic"\`. In addition to the alignment settings for the note, you can also use the css ${"`text-anchor`"} attribute to align the text within the note
    - **color (string)**: Color string, inherited from Annotation but can be customized by directly adding to Note as a prop
    - **titleColor (string)**: Color string, inherited from Annotation but can be customized by directly adding to Note as a prop, overrides color property
    - **labelColor (string)**: Color string, inherited from Annotation but can be customized by directly adding to Note as a prop, overrides color property
    - **wrapSplitter (string or regex)**: A string if you want to customize the way your text is split into new lines, such as manual breaks on new lines
  - **subject (object)**: The following section details the props that can be sent to each Annotation Type's subject property
  
  Specific variables can be sent as properties of the \`subject\` 

  **&lt;AnnotationCalloutCircle />**
  - **radius (number)**: Radius of circle
  - **radiusPadding (number)**: Padding outside of circle, affects spacing between the circle and the start of the connector
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
  - **radius (number)**: Defaults to 14.
  - **topBottom (string, "top" or "bottom")**: Location, can be combined with leftRight to offset the badge into a corner such as the top right corner. Default places the badge in the center.
  - **leftRight (string, "left" or "right")**: Location, can be combined with topBottom to offset the badge into a corner such as the top right corner. Default places the badge in the center.
  
  
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
  const x = 100
  const y = 50

  const circle = (
    <circle cx={x} cy={y} r={7} fill="none" stroke={theme.accent} />
  )

  const NoteCircle = ({ x, y, color }) => {
    return <circle cx={x} cy={y} r={3} fill={color} />
  }

  return (
    <section>
      <Title text="Composable Annotations" id="composable" />
      <p>
        In <code>react-annotation</code> it is easy to add custom elements to an
        annotation. All annotations are composable with the different subjects,
        connectors, and notes.
      </p>
      <svg height={300} className="viz">
        <Annotation
          x={x}
          y={y}
          dx={100}
          dy={50}
          radius={35}
          color={theme.accent}
          title="Custom annotation"
          label="Donut annotations be free!"
          events={{
            onClick: (props, state, event) => {
              console.log(props, state, event)
            }
          }}
        >
          <DonutIcon />
          <SubjectCircle />
          <ConnectorElbow>
            <ConnectorEndDot />
          </ConnectorElbow>
          <NoteCircle />
          {circle}
          <Note align="middle" lineType="vertical" padding={10} />
        </Annotation>
      </svg>
      <Code>
        {`
        import { Annotation, SubjectCircle, ConnectorElbow, ConnectorEndDot, 
          Note } from 'react-annotation'

        const x = 100
        const y = 50
      
        //You can customize just by using the same
        //values you would pass to annotation
        const circle = (
          <circle cx={x} cy={y} r={7} fill="none" stroke={theme.accent} />
        )
      
        //Or you can use a render function that 
        //inherits all of the props from the parent
        //Anotation element
        const NoteCircle = ({ x, y, color }) => {
          return <circle cx={x} cy={y} r={3} fill={color} />
        }

        <Annotation
        x={x}
        y={y}
        dx={100}
        dy={50}
        radius={35}
        color={theme.accent}
        title="Custom annotation"
        label="Donut annotations be free!"
        events={{
          onClick: (props, state, event) => {
            console.log(props, state, event)
          }
        }}
      >
        <DonutIcon />
        <SubjectCircle />
        <ConnectorElbow>
          <ConnectorEndDot />
        </ConnectorElbow>

        //Two custom elements added to this annotation
        <NoteCircle />
        {circle}

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
  const source1 = `
  ### Selecting Elements
  
  - All of the visible shapes (aside from the edit handles) in the default annotations are **paths**
  - Hierarchy of classes:
  ![Annotation classes](img/classes.png)
  - Within the g.annotation-note-content there could be three additional elements: ${"`text.annotation-note-label`"}, ${"`text.annotation-note-title`"}, ${"`rect.annotation-note-bg`"}
    
  - There is also a color property on annotations that will easily change the color of the entire annotation.
  
  ### Tips
  
  - In addition to the alignment settings for the note, you can also use the css ${"`text-anchor`"} attribute to align the text within the note
  - There is an invisible rect (${"`rect.annotation-note-bg`"}) behind the text in the notes as a helper for more click area etc.
  - If you are importing custom fonts, you may notice the annotations don't load perfectly with text wrapping and alignment. To fix that see [this example](https://github.com/susielu/d3-annotation/issues/33). 

  ### Examples in Viz Frameworks

  Semiotic
  - [Example](https://emeeks.github.io/semiotic/#/semiotic/annotations) with an AnnotationCalloutCircle, AnnotationXYThreshold, and AnnotationClloutElbow
  - [Wiki](https://github.com/emeeks/semiotic/wiki/Using-Annotations) on using annotations

  Reach out if you add examples to your framework and would like them listed here.

`

  const source2 = `
Differences from [d3-annotation](http://d3-annotation.susielu.com/)
- Component names are capitalized so \`annotationLabel\` in d3-annotation corresponds with \`AnnotationLabel\` in react-annotation
- There is no longer an annotation collection. This felt unnecessary since the annotation data was being pushed into each annotation directly
- There is no longer accessors. The assumption is that you would map over your annotations and give them the x, y, with any type of scaling functions.
- AnnotationBadge in react-annotation takes \`leftRight\` and \`topBottom\` parameters instead of the corresponding \`x\` and \`y\` parameteres in d3-annotation

If you want to update your code from d3-annotation to react-annotation, here's an example of translation: 

`

  return (
    <section>
      <Title text="In Practice" id="in-practice" />
      <ReactMarkdown source={source1} />
      <h3 id="migrating">Migrating from d3-annotation</h3>
      <ReactMarkdown source={source2} />
      <Code>
        {`
/* ---------------------------- */        
/* Annotations in d3-annotation */
/* ---------------------------- */

const annotations = [{
    note: { label: "Steve Jobs Returns" },
    subject: {
      y1: margin.top,
      y2: height - margin.bottom
    },
    y: margin.top,
    data: { x: "7/9/1997"} //position the x based on an x scale
  },
  {
    note: { label: "iPod Release"},
    subject: {
      y1: margin.top,
      y2: height - margin.bottom
    },
    y: margin.top,
    data: { x: "10/23/2001"}
  },
  {
    note: { label: "Stock Split 2:1", 
      lineType:"none", 
      orientation: "leftRight", 
      align: "middle" },
    className: "anomaly",
    type: d3.annotationCalloutCircle,
    subject: { radius: 35 },
    data: { x: "6/21/2000", y: 76},
    dx: 40
  },
  ]

  const type = d3.annotationCustomType(
    d3.annotationXYThreshold, 
    {"note":{
        "lineType":"none",
        "orientation": "top",
        "align":"middle"}
    }
  )

  const makeAnnotations = d3.annotation()
    .type(type)
    //Gives you access to any data objects in the annotations array
    .accessors({ 
      x: function(d){ return x(new Date(d.x))},
      y: function(d){ return y(d.y) }
    })
    .annotations(annotations)
    .textWrap(30)

  d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)

/* ------------------------------- */
/* Annotations in react-annotation */
/* ------------------------------- */

import { AnnotationXYThreshold, AnnotationCalloutCircle } from "react-annotation"

const makeAnnotations = () => {
  const annotations = [{
    note: { label: "Steve Jobs Returns",     
      orientation: "top"},
    subject: {
      y1: margin.top,
      y2: height - margin.bottom
    },
    y: margin.top,
    data: { x: "7/9/1997"},
    type: AnnotationXYThreshold
  },
  {
    note: { label: "iPod Release",
      orientation: "top"},
    subject: {
      y1: margin.top,
      y2: height - margin.bottom
    },
    y: margin.top,
    data: { x: "10/23/2001"},
    type: AnnotationXYThreshold
  },
  {
    note: { label: "Stock Split 2:1", 
      orientation: "leftRight"},
    className: "anomaly",
    subject: { radius: 35 },
    data: { x: "6/21/2000", y: 76},
    dx: 40
    type: AnnotationCalloutCircle,
  }].map(a => {
    const Annotation = a.type
    const { note, subject, y, dx, data } = a 
    note.wrap = 30
    note.lineType = null
    note.align = "middle"
    return <Annotation
      x={x(new Date(data.x))}
      y={data.y && y(data.y) || y}
      dx={dx}
      note={note}
      subject={subject}
    />
  })

  return <svg>
    <g className="annotation-group">
      {annotations}
    </g>
  </svg>
}
`}
      </Code>
    </section>
  )
}

export function Examples() {
  return (
    <section>
      <Title text="Examples" id="examples" />
      <Tooltip />
      <hr />
      <h3>Annotations for labels, axis, and emphasis</h3>

      <Emmys />
    </section>
  )
}

export function API() {
  const source1 = `  
  
  ### **_Composable Annotations_**
  When using composable annotations, you have an Annotation component. Then a subject, a connector, and a note can be its children.
  
  Examples are in the [Annotation Types UI](#types), and the [Composable Annotations](#composable) sections.
  
  ### Annotation
  **&lt;Annotation />**

  - **x (number)**: X position of the subject and one end of the connector
  - **y (number)**: Y position of the subject and one end of the connector
  - **dx (number)**: X Position of the note and one end of the connector, as an offset from x,y
  - **dx (number)**: Y Position of the note and one end of the connector, as an offset from x,y
  - **nx (number)**: X Position of the note and one end of the connector, as the raw x,y position **not** an offset
  - **ny (number)**: Y Position of the note and one end of the connector, as the raw x,y position **not** an offset
  - **color(string)**: A color string that will be applied to the annotation. This color can be overridden via css or inline-styles
  - **events(object)**: An object with [react event hanlders](https://reactjs.org/docs/handling-events.html) as keys and functions to handle those events. Each handler is bound with the annotation context and has the prarameters: annotation props, annotation state, event

   **&lt;EditableAnnotation />**
  
  All the same props as \`Annotation\`, with built in anchors for dragging the annotation

  - **onDragStart(function)**: Passes the current props of the annotation when dragging starts
  - **onDrag(function)**: Passes the current props of the annotation while dragging 
  - **onDragEnd(function)**: Passes the current props of the annotation when dragging ends


`

  const source3 = `
  ### Subjects

**&lt;SubjectCircle />** 
  - **radius (number)**: Radius of circle
  - **radiusPadding (number)**: Padding outside of circle, affects spacing between the circle and the start of the connector
  - **innerRadius (number)**: Inner radius to make a ring annotation
  - **outerRadius (number)**: Outer radius to make a ring annotation
  - **fill (number)**: Accepts color string
  - **fillOpacity (number)**: Accepts opacity value from 0-1

  **&lt;SubjectRect />**
  - **width (number)**: Accepts negative and positive values
  - **height (number)**: Accepts negative and positive values
  - **fill (number)**: Accepts color string
  - **fillOpacity (number)**: Accepts opacity value from 0-1


  **&lt;SubjectThreshold />**
  - **x1, x2 or y1, y2 (number)**: x1, x2 for a horizontal line, y1, y2 for a vertical line
  
  **&lt;SubjectCustom />**
  - **customID (string: Required)**: Needed for masking the connector by the subject, must be a unique DOM id for the entire page
  - **custom ([array of JSX SVG shapes])**: Array of JSX SVG shapes that are used to compose the custom element
  - **transform (SVG transform string)**: Convenience if you need to offset your custom shape

  **&lt;SubjectBracket />**
  - **width or height (number)**: Using width creates a horizontal bracket, using a height creates a vertical bracket
  - **depth (number)**: How far the bracket pops out from the corners, defaults to 20
  - **type (string, "square" or "curly")**: Type of bracket 

  **&lt;SubjectBadge />**
  - **text (string)**: Text placed in the center of the badge
  - **radius (number)**: Defaults to 14
  - **topBottom (string, "top" or "bottom")**: Location, can be combined with leftRight to offset the badge into a corner such as the top right corner. Default places the badge in the center
  - **leftRight (string, "left" or "right")**: Location, can be combined with topBottom to offset the badge into a corner such as the top right corner. Default places the badge in the center
  
  `

  const connectorText = `### Connectors

  All connectors are automatically passed the x, y and dx, dy positions from \`Annotation\`.  

  - **x (number)**: X position of the subject and one end of the connector
  - **y (number)**: Y position of the subject and one end of the connector
  - **dx (number)**: X Position of the note and one end of the connector, as an offset from x,y
  - **dx (number)**: Y Position of the note and one end of the connector, as an offset from x,y

  **&lt;ConnectorLine />** no additional props


  **&lt;ConnectorElbow />** no additional props


  **&lt;ConnectorCurve />**
  - **curve (function):** Made to use a curve function from [d3-shape](https://github.com/d3/d3-shape), defaults to \`curveCatmullRom\`.
  - **points (array[[x,y],[x,y]...])**: Anchor points for the curve function


  ### ConnectorEnds
  Passed as children to \`Connectors\` to add an arrow or dot to the end of a connector

  All connector ends have a \`scale\` property to adjust the size.

  - **scale (number)**: A multiplying factor for sizing the connector end

  **&lt;ConnectorEndArrow />** no additional props

  **&lt;ConnectorEndDot />** no additional props  

  
`

  const noteText = `
### Notes

**&lt;Note />**
- **title (string)**
- **label (string)**
- **padding (number)**
- **bgPadding (number or Object with one or more options of top, bottom, left, or right)**: this allows you to add more of a padding to the rectangle behind the text element, only available in version 1.3.0 and higher
- **orientation (string, "leftRight" or "topBottom")**: Determines based on the dx, and dy, which direction to orient the \`Note\`. Default is set to \`"topBottom\`
- **lineType (string, "vertical" or "horizontal")**: Creates a line along the edge of the note text. **Please Note** if you set this to \`"vertical"\` then \`orientation\` is fixed at \`"leftRight"\` and vice versa if it is \`"horizontal"\` then \`orientation\` is fixed at \`"topBottom"\` 

- **align (string, "left", "right", "middle", "top", "bottom", "dynamic")**: When the orientation is set to \`"topBottom"\` or lineType is set to \`"horiztonal"\` you can align the note with \`"top"\`, \`"bottom"\`, \`"middle"\`, or \`"dynamic"\`. When the orientation is set to \`"leftRight"\` or \`lineType\` is set to \`"vertical"\` you can align the note with \`"left"\`, \`"right"\`, \`"middle"\`, or \`"dynamic"\`. In addition to the alignment settings for the note, you can also use the css ${"`text-anchor`"} attribute to align the text within the note
- **color (string)**: Color string, inherited from Annotation but can be customized by directly adding to Note as a prop
- **titleColor (string)**: Color string, inherited from Annotation but can be customized by directly adding to Note as a prop, overrides color property
- **labelColor (string)**: Color string, inherited from Annotation but can be customized by directly adding to Note as a prop, overrides color property
- **wrapSplitter (string or regex)**: A string if you want to customize the way your text is split into new lines, such as manual breaks on new lines

**&lt;BracketNote />** use with &lt;SubjectBracket />
- This Note has all of the same properties as the regular Note, except it has dynamic positioning of the dx, and dy depending on the settings given to \`SubjectBracket\`
`
  return (
    <section>
      <Title text="API" id="composable-api" />
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
        
        //Subject props given to Annotation.
        //They are passed down to the Subject.
        radius={30}
      >
        <SubjectCircle />
      </Annotation>
      `}</Code>
      <ReactMarkdown source={source3} />
      <ReactMarkdown source={connectorText} />
      <ReactMarkdown source={noteText} />
    </section>
  )
}

export function Notes() {
  const source = `
  Inspired by all of the [prior art](https://github.com/susielu/d3-annotation#prior-art) in annotations, particularly [Adam Pearce](https://twitter.com/adamrpearce)'s [Swoopy Drag](https://1wheel.github.io/swoopy-drag/), and [Andrew Mollica](https://twitter.com/armollica)'s [Ring Note](https://github.com/armollica/d3-ring-note). 
  
  Thumbs up to [Nunito](https://fonts.google.com/specimen/Nunito) and [Bungee](https://fonts.google.com/specimen/Bungee) via Google Fonts and [Material UI](http://www.material-ui.com/#/) for making the docs site building a breeze.
  
  `

  return (
    <section>
      <Title text="Notes" id="notes" />
      <ReactMarkdown source={source} />
    </section>
  )
}
