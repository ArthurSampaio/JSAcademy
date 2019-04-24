import React, { useState, useEffect } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import Check from "@material-ui/icons/Check";

// core components
import Header from 'components/Header/Header.jsx'
import TerminalJS from 'components/TerminalJS/TerminalJS'
import Button from 'components/CustomButtons/Button.jsx'
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx'

// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import LessonAPI from '../../services/LessonAPI'

import componentsStyle from 'assets/jss/material-kit-react/views/skill.jsx'

const Skill = props => {
  const { classes, ...rest } = props
  const [task, setTask] = useState({})
  const [func, setFunc] = useState(' ')
  const [lesson, setLesson] = useState({})
  const [order, setOrder] = useState(0)
  const [accept, setAccept] = useState(false)
  const [runned, setRunned] = useState(false)

  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      const res = await getLesson()
      setLesson(res)
      setTask(res.exercises[order])
      setFunc(res.exercises[order].appraisedFunction)
      setRunned(false)
      setAccept(false)
    }
    fetchData()
  }, [func, order])

  function getLesson() {
    const { match } = props
    return LessonAPI.getLessonById(match.params.lessonId)
  }

  function nextExercise() {
    const newOrder = order + 1 < lesson.exercises.length ? order + 1 : order
    setOrder(newOrder)
  }

  function previousExercise() {
    const newOrder = order - 1 >= 0 ? order - 1 : order
    setOrder(newOrder)
  }

  function handleChange(value) {
    setRunned(true)
    setAccept(value)
    const help = value
      ? () => setTimeout(function(){nextExercise() }, 2000)
      : () => console.log('Errou')
    help()
  }

  function onClear(value) {
    setRunned(false)
  }

  function renderSnackConfirmation() {
    const correct = (
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> You've got some friends nearby, stop looking
            at your phone and find them...
          </span>
        }
        close
        color="success"
        icon={Check}
      />
    )
    const wrong = (
      <SnackbarContent
        message={
          <span>
            <b>DANGER ALERT:</b> You've got some friends nearby, stop looking at
            your phone and find them...
          </span>
        }
        color="danger"
        icon="info_outline"
      />
    )
    return  accept ? correct : wrong
  }

  function renderNavigation() {
    return (
      <div>
        <Button
          id="run"
          variant="contained"
          color="primary"
          onClick={previousExercise}
        >
          previous
        </Button>
        <Button
          id="run"
          variant="contained"
          color="primary"
          onClick={nextExercise}
        >
          next
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Header
        brand="Javascript Academy"
        rightLinks={<HeaderLinks />}
        fixed
        color="info"
        {...rest}
      />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.sections}>
            <div className={classes.container}>
              <TerminalJS task={task} onRun={handleChange} onClear={onClear} showButtonTest={runned} />
            </div>
          </div>
        </div>

        <div className={classes.navigation}>
          {runned ? renderSnackConfirmation() : renderNavigation()}

        </div>
      </div>
    </div>
  )
}

export default withStyles(componentsStyle)(Skill)
