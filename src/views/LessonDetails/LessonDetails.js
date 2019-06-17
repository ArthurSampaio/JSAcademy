import React, { useState, useEffect, Fragment } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
// @material-ui/icons

// core components

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import ListItemNew from 'components/ListItemNew/ListItemNew'
import List from '@material-ui/core/List'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import CustomTabs from 'components/CustomTabs/CustomTabs.jsx'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import lessonDetailsStyle from 'assets/jss/material-kit-react/views/lessonDetailsStyle.jsx'

import LessonAPI from './../../services/LessonAPI'
//TODO: adicionar casos quando for um anonymous id
const LessonDetails = props => {
  const {
    classes,
    location: { state },
    ...rest
  } = props
  const [lesson, setLesson] = useState(lesson)
  const [loading, setLoading] = useState(false)
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await getLesson()
      setLesson(res)
      setLoading(false)
    }
    fetchData()
    console.log(state)
  }, [])

  const getLesson = () => {
    const { match } = props
    return LessonAPI.getLessonById(match.params.lessonId)
  }

  const getMetrics = () => {
    return LessonAPI.getMetricsForLessonId(lesson._id)
  }

  const loadMetrics = async () => {
    setLoading(true)
    const metrics = await getMetrics()
    setMetrics(
      metrics.map(item => {
        return {
          ...item,
          lesson: lesson,
        }
      })
    )
    console.log('metrics', metrics)
    setLoading(false)
  }

  const renderHead = () => {
    return (
      lesson && (
        <div className={classes.title}>
          <h2>{lesson.name}</h2>
          <Divider />
          <div className={classes.subtitle}>
            <small>{`${
              lesson.viewed > 0
                ? `${lesson.viewed} pessoas viram esta lição`
                : 'Ninguém viu esta lição'
            } | ${
              lesson.answered > 0
                ? `${lesson.answered} pessoas responderam esta lição`
                : ''
            } `}</small>
          </div>
        </div>
      )
    )
  }

  const renderMetricsEmpty = () => {
    return (
      <List component="nav">
        <ListItem button block alignItems="center" onClick={loadMetrics}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: '#7AC70C' }}>
              <CloudDownloadIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            inset
            primary={
              <Fragment>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Clique aqui para carregar as métricas desta lição
                </Typography>
              </Fragment>
            }
          />
        </ListItem>
      </List>
    )
  }

  const createTabs = () => {
    const tabs =
      lesson &&
      lesson.exercises.map(exercise => {
        return {
          tabName: exercise.title,
          tabContent: (
            <Fragment>
              <h4>Descrição</h4>
              <p>{exercise.description}</p>
              <AceEditor
                mode="javascript"
                theme="monokai"
                name="terminal-editor"
                editorProps={{ $blockScrolling: false }}
                value={exercise.appraisedFunction}
                readOnly
              />
            </Fragment>
          ),
        }
      })
    return tabs
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
            {renderHead()}
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <h3>
                  <small>Visão Geral da Lição</small>
                </h3>
                <CustomTabs headerColor="success" tabs={createTabs() || []} />
              </GridItem>
            </GridContainer>
            <div className={classNames(classes.root, classes.mainRaised)}>
              {metrics.length === 0 ? (
                renderMetricsEmpty()
              ) : (
                <ListItemNew
                  items={metrics}
                  loading={loading}
                  type={'metrics'}
                  {...props}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(lessonDetailsStyle)(LessonDetails)
