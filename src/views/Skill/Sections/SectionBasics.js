import React, { useState, useEffect } from 'react';
// plugin that creates slider
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import TerminalJS from "components/TerminalJS/TerminalJS";
import ExercisesAPI from "../../../services/ExercisesAPI.js"

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

const SectionBasics = (props) => {

  const { classes } = props;
  const [task, setTask] = useState({})
  const [func, setFunc] = useState('');

  useEffect(() => {
    // Update the document title using the browser API
    getTask().then(res => {
      setFunc(res.appraisedFunction);

      setTask(res);
    })
  }, []);

  function getTask() {
    const { match } = props;
    return ExercisesAPI.getExercisesById(match.params.taskId);

  }

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
        <TerminalJS name="Terminal" task={task} func={func} />

      </div>
    </div>
  );
}

export default withStyles(basicsStyle)(SectionBasics);
