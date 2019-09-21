import React from "react"
import Handle from "../Handle"

export default class Connector extends React.Component {
  getComponents() {}

  render() {
    const { color, dx, dy, customID, editMode } = this.props

    if (dx === 0 && dy === 0) {
      return <g className="annotation-connector" />
    }

    const d = this.getComponents(this.props) || []
    const cleanedProps = Object.assign({}, this.props)
    delete cleanedProps.children

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ...cleanedProps,
        ...child.props,
        scale: cleanedProps.endScale || child.props.endScale,
        lineData: d.components[0].data
      })
    )
    let handles

    if (editMode && d.handles && d.handles.length > 0) {
      handles = d.handles.map((h, i) => (
        <Handle
          key={`connectorhandle-${i}`}
          handleStart={this.props.dragStart}
          handleStop={this.props.dragEnd}
          x={h.x}
          y={h.y}
          offsetParent={h.offsetParent && this.connector}
          handleDrag={(e, data) => {
            this.props.dragConnectorSettings(e, d.handleFunction(h, data))
          }}
        />
      ))
    }

    return (
      <g className="annotation-connector" {...this.props.gAttrs}>
        {d.components &&
          d.components.map((c, i) => {
            const attrs = {}
            if (!c) return null
            Object.keys(c.attrs).forEach(k => {
              if (c.attrs[k] && k !== "text") {
                attrs[k.replace(/-([a-z])/g, g => g[1].toUpperCase())] =
                  c.attrs[k]
              }
            })
            return (
              <c.type
                mask={customID ? `url(#${customID})` : undefined}
                key={i}
                className={c.className}
                fill="none"
                stroke={color}
                {...attrs}
              >
                {c.attrs.text}
              </c.type>
            )
          })}
        {childrenWithProps}
        {handles}
      </g>
    )
  }
}
