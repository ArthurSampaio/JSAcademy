import React, { useState, useEffect } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import SvgIcon from '@material-ui/core/SvgIcon'

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import ListItemNew from 'components/ListItemNew/ListItemNew'
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx'

import Divider from '@material-ui/core/Divider'

import metricLessonStyle from 'assets/jss/material-kit-react/views/metricLesson.jsx'
import LessonAPI from './../../services/LessonAPI'
import { ReactComponent as Sad } from '../../assets/img/sad.svg'
import Button from 'components/CustomButtons/Button.jsx'
import { Link } from 'react-router-dom'

//TODO: adicionar casos quando for um anonymous id
const ChooseLesson = props => {
  const { classes, ...rest } = props
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const lsss = await LessonAPI.getLessonsForUser()
      setLessons(lsss)
      setLoading(false)
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
              {lessons.length > 0 ? (
                <ListItemNew
                  type={'lesson'}
                  lessons={lessons}
                  loading={loading}
                  {...props}
                />
              ) : (
                <div>
                  <SnackbarContent
                    message={
                      <div>
                        <b>Não possuimos nenhuma questão para você hoje</b>
                        <Button
                          color={'transparent'}
                          component={Link}
                          to={'/create-lesson'}
                        >
                          Mas, não desanime. Você pode criar lição aqui uma aqui
                        </Button>
                      </div>
                    }
                    color="warning"
                    icon="info_outline"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(metricLessonStyle)(ChooseLesson)
