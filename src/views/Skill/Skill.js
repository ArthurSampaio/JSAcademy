import React, { useState, useEffect } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react components for routing our app without refresh
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import TerminalJS from 'components/TerminalJS/TerminalJS'
import Button from 'components/CustomButtons/Button.jsx'

// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import SectionBasics from './Sections/SectionBasics'
import LessonAPI from '../../services/LessonAPI'

import componentsStyle from 'assets/jss/material-kit-react/views/components.jsx'

const Skill = props => {
  const { classes, ...rest } = props
  const [task, setTask] = useState({})
  const [func, setFunc] = useState(' ')
  const [lesson, setLesson] = useState({})
  const [order, setOrder] = useState(0)

  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      const res = await getLesson()
      setLesson(res)
      setTask(res.exercises[order])
      setFunc(res.exercises[order].appraisedFunction)
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
    const help = value ? nextExercise : console.log
    help()
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
          <div className={classes.brand} />
          <div className={classes.sections}>
            <div className={classes.container}>
              <TerminalJS task={task} onRun={handleChange} />
            </div>
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
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(componentsStyle)(Skill)
