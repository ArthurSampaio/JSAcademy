import React from "react";
// plugin that creates slider
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import TerminalJS from "components/TerminalJS/TerminalJS";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

const SectionBasics = (props) => {

  const { classes } = props;
  const testValue = `function a (b) {
      const d = (x) => 2*x
      const e = b.map(item => d(item))
      return e
  
  }
  a(b)`
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Basic Elements</h2>
        </div>
        <TerminalJS name="Terminal" func={testValue} />

      </div>
    </div>
  );
}

export default withStyles(basicsStyle)(SectionBasics);
