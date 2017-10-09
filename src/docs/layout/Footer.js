import React from "react"
import FlatButton from "material-ui/FlatButton"

const Footer = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <footer className="box-row center">
            <hr />
            <FlatButton
              primary
              label={"abaus-material-filter-panel repo"}
              labelStyle={{
                fontWeight: "bold",
                textTransform: "normal"
              }}
              onTouchTap={() =>
                window.open(
                  `https://stash.corp.netflix.com/projects/ABACUS/repos/abacus-material-filter-panel/browse`
                )}
            />
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Footer
