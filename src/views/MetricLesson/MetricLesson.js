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
  const {
    classes,
    location: { state },
    ...rest
  } = props
  const [expanded, setExpanded] = useState(false)
  const [metrics, setMetrics] = useState({})
  const [lesson, setLesson] = useState(state || {})

  useEffect(() => {
    const updateStates = res => {
      setLesson(res.lesson)
      setMetrics(res)
    }
    const fetchData = async () => {
      console.log('do refetch')
      const res = await getMetrics()
      updateStates(res)
    }
    lesson && lesson.createdAt ? updateStates(lesson) : fetchData()
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
    const createdAt = new Date(lesson.createdAt)
    const answeredAt = new Date(metrics.createdAt)
    return (
      <div className={classes.title}>
        <h2>{lesson.name}</h2>
        <Divider />
        <div className={classes.subtitle}>
          <small>{`Você respondeu em: ${metrics.totalTime} ms`}</small> <br />
          <small> Respondido por: {lesson.answered}</small> |
          <small> Visto por: {lesson.viewed}</small> <br />
          <small> Você respondeu em: {answeredAt.toLocaleDateString()}</small> |
          <small>
            {' '}
            A lição foi criada em: {createdAt.toLocaleDateString()}
          </small>
        </div>
      </div>
    )
  }

  const renderSinglePanel = (metric, index) => {
    console.log(metric)
    return (
      <ExpansionPanel
        expanded={expanded === metric._id}
        onChange={handleChange(metric._id)}
        className={classes.panelContent}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className={classes.column}>
            <Typography
              className={classNames(classes.heading, classes.panelTitle)}
            >
              {metric.exercise.title || lesson.exercises[index].title}
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
          <div className={classNames(classes.column, classes.codeContent)}>
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="terminal-editor"
              editorProps={{ $blockScrolling: false }}
              value={metric.code}
              readOnly
            />
          </div>
          <div className={classNames(classes.column, classes.infoContent)}>
            <Typography className={classes.heading}>
              Descrição:{' '}
              {metric.exercise.description ||
                lesson.exercises[index].description}
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  const renderPanels = () => {
    const exercisesMetrics = metrics.exercisesMetrics
    console.log('metrics', metrics)
    return (
      exercisesMetrics &&
      exercisesMetrics.map((item, index) => (
        <Fragment key={item._id}>{renderSinglePanel(item, index)}</Fragment>
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
