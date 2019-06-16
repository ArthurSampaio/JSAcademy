import React from 'react'
import { Link } from 'react-router-dom'

// nodejs library that concatenates classes
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
import ButtonGroup from '@material-ui/core/ButtonGroup'

import componentsStyle from 'assets/jss/material-kit-react/views/register.jsx'

const RegisterPage = props => {
  const { classes, ...rest } = props

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
