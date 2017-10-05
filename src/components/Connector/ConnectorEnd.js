import React from "react"
import PropTypes from "prop-types"

export default class ConnectorEnd extends React.Component {
  getComponents() {}

  render() {
    const { color } = this.props
    const d = this.getComponents(this.props) || []
    const c = d.components[0]

    return <c.type className={c.className} {...c.attrs} fill={color} />
  }
}

ConnectorEnd.defaultProps = {}
ConnectorEnd.propTypes = {}
