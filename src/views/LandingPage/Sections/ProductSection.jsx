import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// @material-ui/icons
import School from '@material-ui/icons/School'
import AvTimer from '@material-ui/icons/AvTimer'
import DeveloperMode from '@material-ui/icons/DeveloperMode'
// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import InfoArea from 'components/InfoArea/InfoArea.jsx'

import productStyle from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx'

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Por que JS Academy?</h2>
            {/* <h5 className={classes.description}>
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn't scroll to get here. Add a button if you want
              the user to see more.
            </h5> */}
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Ideal para produtores de contéudo javascript"
                description="Nosso ambiente permite a criação e compartilhamento de atividades em javascript."
                icon={School}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Aprendar em qualquer hora, em qualquer lugar"
                description="Torne suas pausas e esperas mais produtivas. A partir de qualquer dispositivo com internet é possível fazer nossos exercícios. "
                icon={AvTimer}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Javascript para progamadores"
                description="Somos focados em ensinar Javascript e Programação Funcional para programadores ativos, que estão querendo atualizar seus conhecimentos ou simplesmente estudar um pouco mais."
                icon={DeveloperMode}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    )
  }
}

export default withStyles(productStyle)(ProductSection)
