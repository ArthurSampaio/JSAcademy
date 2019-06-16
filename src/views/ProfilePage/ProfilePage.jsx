import React, { useState } from 'react'
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

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.jsx'

const ProfilePage = props => {
  const { classes, ...rest } = props

  const [expanded, setExpanded] = useState(false)
  getMetrics()
  const getMetrics = () => {
    const {
      match: {
        props: { metricId },
      },
    } = props
  }

  const handleChange = panel => (event, isExpanded) => {
    getMetrics()

    setExpanded(isExpanded ? panel : false)
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
            <div className={classes.title}>
              <h2>Basic Elements</h2>
              <Divider />
            </div>
            <div className={classes.root}>
              <ExpansionPanel
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <div className={classes.column}>
                    <Typography className={classes.heading}>
                      General settings
                    </Typography>
                  </div>
                  <div className={classes.column}>
                    <Typography className={classes.heading}>
                      I am an expansion panel
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
                      value={
                        'function filter2 (arr){ return arr.filter(i=>i%2==0)}'
                      }
                      readOnly
                    />
                  </div>
                  <div className={classes.column}>
                    <Typography className={classes.heading}>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography className={classes.heading}>Users</Typography>
                  <Typography className={classes.secondaryHeading}>
                    You are currently not an owner
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Donec placerat, lectus sed mattis semper, neque lectus
                    feugiat lectus, varius pulvinar diam eros in elit.
                    Pellentesque convallis laoreet laoreet.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography className={classes.heading}>
                    Advanced settings
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    Filtering has been entirely disabled for whole web server
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                    Integer sit amet egestas eros, vitae egestas augue. Duis vel
                    est augue.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography className={classes.heading}>
                    Personal data
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                    Integer sit amet egestas eros, vitae egestas augue. Duis vel
                    est augue.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>{' '}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(profilePageStyle)(ProfilePage)
