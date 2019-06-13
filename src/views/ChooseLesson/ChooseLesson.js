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

import Divider from '@material-ui/core/Divider'

import metricLessonStyle from 'assets/jss/material-kit-react/views/metricLesson.jsx'
import UserAPI from './../../services/UserAPI'
import { AuthService } from './../../services/Auth'

//TODO: adicionar casos quando for um anonymous id
const ChooseLesson = props => {
  const { classes, ...rest } = props
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const userId = AuthService.currentUserDecodeValue._id
      const res = await UserAPI.getUser(userId)
      setUser(res)
    }
    fetchData()
  }, [])

  const renderHead = () => {
    return (
      <div className={classes.title}>
        <h2>Escolha seu exercício hoje</h2>
        <Divider />
        <div className={classes.subtitle}>
          <small>{`Aqui são mostrados todos os exercícios que você ainda não respondeu`}</small>
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
            <div className={(classes.root, classes.mainRaised)}>
              <ListItemNew answered={getAnsweredLessons()} {...props} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(metricLessonStyle)(ChooseLesson)
