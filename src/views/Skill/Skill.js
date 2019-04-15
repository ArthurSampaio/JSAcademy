import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import SectionBasics from "./Sections/SectionBasics";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

const Skill = (props) => {

  const { classes, ...rest } = props;
  return (
    <div>
      <Header
        brand="Javascript Academy"
        rightLinks={<HeaderLinks />}
        fixed
        color="info"
        {...rest}
      />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.brand}>
          </div>
          <SectionBasics {...props} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withStyles(componentsStyle)(Skill);
