import React, { useState, useEffect } from 'react';
// plugin that creates slider
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import TerminalJS from "components/TerminalJS/TerminalJS";
import Button from "components/CustomButtons/Button.jsx";
import LessonAPI from "../../../services/LessonAPI.js";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

const SectionBasics = (props) => {

  const { classes } = props;
  const [task, setTask] = useState({})
  const [func, setFunc] = useState(' ');
  const [lesson, setLesson] = useState({})
  const [order, setOrder] = useState(0)

  console.log(lesson)
  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      const res = await getLesson();
      setLesson(res);
      setTask(res.exercises[order]);
      setFunc(res.exercises[order].appraisedFunction);
    }
    fetchData();
  }, [func, order]);

  function getLesson() {
    const { match } = props;
    return LessonAPI.getLessonById(match.params.lessonId);
  }

  function nextExercise() {
    const newOrder = order + 1 < lesson.exercises.length ? order + 1 : order;
    setOrder(newOrder);
  }

  function previousExercise() {
    const newOrder = order - 1 >= 0 ? order - 1 : order;
    setOrder(newOrder);
  }


  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <TerminalJS task={task} />
      </div>
      <Button id="run" variant="contained" color="primary" onClick={previousExercise}>
        previous
      </Button>
      <Button id="run" variant="contained" color="primary" onClick={nextExercise}>
        next
      </Button>

    </div>
  );
}

export default withStyles(basicsStyle)(SectionBasics);
