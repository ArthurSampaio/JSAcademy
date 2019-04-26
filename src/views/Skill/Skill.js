import React, { useState, useEffect } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons

// core components
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";

import Header from 'components/Header/Header.jsx'
import TerminalJS from 'components/TerminalJS/TerminalJS'
import SnackNavigation from '../../components/SnackNavigation/SnackNavigation'

// sections for this page
import HeaderProgress from 'components/Header/HeaderProgress.jsx'
import LessonAPI from '../../services/LessonAPI'

import skillStyle from 'assets/jss/material-kit-react/views/skill.jsx'

const Skill = props => {
  const { classes, ...rest } = props
  const [task, setTask] = useState({})
  const [lesson, setLesson] = useState({})
  const [order, setOrder] = useState(0)
  const [accept, setAccept] = useState(false)
  const [runned, setRunned] = useState(false)
  const [answers, setAnswers] = useState(0)

  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      const res = await getLesson()
      setLesson(res)
      setTask(res.exercises[order])
      setRunned(false)
      setAccept(false)
    }
    fetchData()
  }, [order])

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

  function updateExerciseWithAnswer(value) {
    lesson.exercises[order].accept = value
    setLesson(lesson)
    const count = answers + (value ? (1 / lesson.exercises.length) * 100 : 0)
    setAnswers(count)
  }

  function handleChange(value) {
    setRunned(true)
    setAccept(value)

    updateExerciseWithAnswer(value)
    const help = value
      ? () => setTimeout(function () { nextExercise() }, 2000)
      : () => console.log('Errou')
    help()
  }

  function onClear(value) {
    setRunned(false)
  }



  return (
    <div>
      <Header
        brand="Javascript Academy"
        rightLinks={<HeaderProgress />}
        fixed
        color="success"
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

        <SnackNavigation accept={accept} runned={runned} previousExercise={previousExercise} nextExercise={nextExercise} linearValue={answers} />
      </div>
    </div>
  )
}

export default withStyles(skillStyle)(Skill)
