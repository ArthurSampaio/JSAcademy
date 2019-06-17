import React, { useState, useEffect } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
// @material-ui/icons

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import ListItemNew from 'components/ListItemNew/ListItemNew'
import Tooltip from '@material-ui/core/Tooltip'

import Divider from '@material-ui/core/Divider'

import myLessonsStyle from 'assets/jss/material-kit-react/views/myLessonsStyle.jsx'
import LessonAPI from './../../services/LessonAPI'
import { Link } from 'react-router-dom'

//TODO: adicionar casos quando for um anonymous id
const MyLessons = props => {
  const { classes, ...rest } = props
  const [loading, setLoading] = useState(false)
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const resLessons = await getMyLessons()
      setLessons(resLessons)
      setLoading(false)
    }
    fetchData()
  }, [])

  const getMyLessons = async () => {
    return await LessonAPI.myLessons()
  }

  const renderHead = () => {
    return (
      <div className={classes.title}>
        <Tooltip title="Criar questão" style={{ backgroundColor: '#7AC70C' }}>
          <Fab
            color="inherit"
            component={Link}
            to="/create-lesson"
            aria-label="Add"
            className={classes.fab}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <h2>Minhas Lições</h2>
        <Divider />
        <div className={classes.subtitle}>
          <small>{`Suas lições são mostradas aqui`}</small>
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
            <div className={classNames(classes.root, classes.mainRaised)}>
              <ListItemNew
                type={'my-lessons'}
                items={lessons}
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

export default withStyles(myLessonsStyle)(MyLessons)
