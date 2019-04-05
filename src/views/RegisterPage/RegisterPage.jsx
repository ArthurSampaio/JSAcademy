import React, { useState, Fragment } from 'react';
import { Link } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


import componentsStyle from "assets/jss/material-kit-react/views/register.jsx";

const RegisterPage = (props) => {

  const { classes, ...rest } = props;
  const [selectRadio, setSelectRadio] = useState("a")

  function onChangeRadio(onchange) {
    console.log(onchange.target.value)
    setSelectRadio(onchange.target.value)
  }

  const dailyMinutes = [
    { value: "a", text: "Melhor que nada", time: "5" },
    { value: "b", text: "De boa", time: "10" },
    { value: "c", text: "Instigado", time: "15" },
    { value: "d", text: "Sange nos olhos", time: "20" }
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
      <Parallax image={require("assets/img/register-bg.png")}>
        <div className={classes.container}>
          <div className={classes.brand}>
            <h3 className={classes.title}>
              Ótimo! Agora escolha sua meta diária.
            </h3>
            <GridContainer>
              <GridItem >
                {dailyMinutes.map(item => (
                  <Fragment key={item.value} className={classes.contentAlign}>
                    <div

                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={selectRadio === item.value}
                            onChange={onChangeRadio}
                            value={item.value}
                            name="radio button enabled"
                            aria-label="A"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord className={classes.radioChecked} />
                            }
                            classes={{
                              checked: classes.radio
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label={`${item.text} - ${item.time} minutos`}
                      />
                    </div>
                  </Fragment>
                ))}
                <Button component={Link} to="/skill" className={classes.buttonRegister} id="run" variant="contained" color="primary" >
                  Definir Meta.
                </Button>
              </GridItem>

            </GridContainer>
          </div>

        </div>
      </Parallax>
    </div>
  );
}


export default withStyles(componentsStyle)(RegisterPage);
