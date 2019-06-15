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
import LessonAPI from './../../services/LessonAPI'

//TODO: adicionar casos quando for um anonymous id
const ChooseLesson = props => {
  const { classes, ...rest } = props
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const lsss = await LessonAPI.getLessonsForUser()
      setLessons(lsss)
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
              <ListItemNew type={'lesson'} lessons={lessons} {...props} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(metricLessonStyle)(ChooseLesson)
