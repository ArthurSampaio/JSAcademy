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
import UserAPI from './../../services/UserAPI'
import { AuthService } from './../../services/Auth'

//TODO: adicionar casos quando for um anonymous id
const MyAnswers = props => {
  const { classes, ...rest } = props
  const [metrics, setMetrics] = useState({})
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const userId = AuthService.currentUserDecodeValue._id
      const res = await UserAPI.getUser(userId)
      setUser(res)
    }
    fetchData()
  }, [])

  console.log('>>', user)

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
            <div className={classes.root}>{'qdasdasd'}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(metricLessonStyle)(MyAnswers)
