import React, { useState, useEffect, Fragment } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

import metricLessonStyle from 'assets/jss/material-kit-react/views/metricLesson.jsx'
import LessonAPI from './../../services/LessonAPI'

const MetricLesson = props => {
  const { classes, ...rest } = props
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  )
  const [expanded, setExpanded] = useState(false)
  const [metrics, setMetrics] = useState({})
  const [lesson, setLesson] = useState({})
  const [exercisesMetrics, setExercisesMetrics] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMetrics()
      setLesson(res.lesson)
      setMetrics(res)
    }
    fetchData()
  }, [])

  const getMetrics = () => {
    const {
      match: {
        params: { metricId },
      },
    } = props
    return LessonAPI.getLessonMetrics(metricId)
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const renderHeadMetric = () => {
    return (
      <div className={classes.title}>
        <h2>{lesson.name}</h2>
        <Divider />
      </div>
    )
  }

  const renderSinglePanel = metric => {
    console.log(metric)
    return (
      <ExpansionPanel
        expanded={expanded === metric._id}
        onChange={handleChange(metric._id)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {metric.exercise.title}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              Tempo: {metric.time} ms | Tentativas: {metric.attempts}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
          <div className={classes.column}>
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="terminal-editor"
              editorProps={{ $blockScrolling: false }}
              value={metric.code}
              readOnly
            />
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  const renderPanels = () => {
    const exercisesMetrics = metrics.exercisesMetrics
    return (
      exercisesMetrics &&
      exercisesMetrics.map(item => (
        <Fragment key={item._id}>{renderSinglePanel(item)}</Fragment>
      ))
    )
  }

  return (
    <div>
      <Header
        color="white"
        brand="Javascript Academy "
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: 'white',
        }}
        {...rest}
      />
      <div className={classNames(classes.main)}>
        <div>
          <div className={classes.container}>
            {renderHeadMetric()}
            <div className={classes.root}>{renderPanels()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(metricLessonStyle)(MetricLesson)
