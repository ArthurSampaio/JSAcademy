import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// @material-ui/icons
import Explore from '@material-ui/icons/Explore'

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Parallax from 'components/Parallax/Parallax.jsx'
import { Link } from 'react-router-dom'

import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx'

// Sections for this page
import ProductSection from './Sections/ProductSection.jsx'

const dashboardRoutes = []

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand={<span>{'Javascript Academy'}</span>}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white',
          }}
          {...rest}
        />
        <Parallax filter image={require('assets/img/background-ld.png')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Aprenda Javascript. Agora!</h1>
                <br />
                <Link to="/what-to-do-today">
                  <Button color="primary" size="lg">
                    <i className="fas fa-play" />
                    Começar
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(landingPageStyle)(LandingPage)
