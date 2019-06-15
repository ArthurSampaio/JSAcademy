import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'

// nodejs library that concatenates classes
import classNames from 'classnames'
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
// core components
import Header from 'components/Header/Header.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Parallax from 'components/Parallax/Parallax.jsx'
// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

import componentsStyle from 'assets/jss/material-kit-react/views/register.jsx'

const RegisterPage = props => {
  const { classes, ...rest } = props
  const [selectRadio, setSelectRadio] = useState('a')

  function onChangeRadio(onchange) {
    console.log(onchange.target.value)
    setSelectRadio(onchange.target.value)
  }

  const dailyMinutes = [
    { value: 'a', text: 'Melhor que nada', time: '5' },
    { value: 'b', text: 'De boa', time: '10' },
    { value: 'c', text: 'Instigado', time: '15' },
    { value: 'd', text: 'Sangue nos olhos', time: '20' },
  ]

  return (
    <div>
      <Header
        brand="Javascript Academy"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        {...rest}
      />
      <Parallax image={require('assets/img/register-bg.png')}>
        <div className={classes.container}>
          <div className={classes.brand}>
            <h3 className={classes.title}>
              Ótimo! O que você quer fazer hoje?
            </h3>
            <GridContainer className={classes.containerGrid}>
              <GridItem>
                {/* <Button component={Link} to="/skill/5cc34f366fa1ae44102f7605" className={classes.buttonRegister} id="run" variant="contained" color="primary" >
                  Definir Meta.
                </Button> */}
                <ButtonGroup
                  fullWidth
                  aria-label="group button"
                  color="primary"
                >
                  <Button
                    className={classes.buttonChoices}
                    component={Link}
                    to="/create-lesson"
                  >
                    Quero criar uma lista de exercícios
                  </Button>
                  <Button component={Link} to="/choose-lesson">
                    Quero responder uma lista de exercícios
                  </Button>
                </ButtonGroup>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </Parallax>
    </div>
  )
}

export default withStyles(componentsStyle)(RegisterPage)
