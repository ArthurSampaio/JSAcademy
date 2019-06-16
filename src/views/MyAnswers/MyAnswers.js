import React, { useState, useEffect } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import ListItemNew from 'components/ListItemNew/ListItemNew'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'

import Divider from '@material-ui/core/Divider'

import metricLessonStyle from 'assets/jss/material-kit-react/views/metricLesson.jsx'
import UserAPI from './../../services/UserAPI'
import { AuthService } from './../../services/Auth'

//TODO: adicionar casos quando for um anonymous id
const MyAnswers = props => {
  const { classes, ...rest } = props
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const userId = AuthService.currentUserDecodeValue._id
      const res = await UserAPI.getUser(userId)
      setUser(res)
      setLoading(false)
    }
    fetchData()
  }, [])

  const renderHead = () => {
    return (
      <div className={classes.title}>
        <h2>Minhas Respostas</h2>
        <Divider />
        <div className={classes.subtitle}>
          <small>{`Suas lições são mostradas aqui`}</small>
        </div>
      </div>
    )
  }

  const getAnsweredLessons = () => {
    const answeredLesson =
      user.answeredLesson &&
      user.answeredLesson.map(item => {
        return {
          ...item,
          exercisesMetrics: item.exercisesMetrics.map(el => {
            return {
              ...el,
              exercise: item.lesson.exercises.filter(
                ex => ex._id === el.exercise
              )[0],
            }
          }),
        }
      })

    return answeredLesson
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
            <div className={classNames(classes.root, classes.mainRaised)}>
              <ListItemNew
                answered={getAnsweredLessons()}
                loading={loading}
                {...props}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(metricLessonStyle)(MyAnswers)
