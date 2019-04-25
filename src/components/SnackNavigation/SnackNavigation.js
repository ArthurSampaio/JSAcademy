import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Check from "@material-ui/icons/Check";

import snackbarStyle from "assets/jss/material-kit-react/components/snackNavigationStyle.jsx";

import basicsStyle from 'assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx'
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx'

import Button from 'components/CustomButtons/Button.jsx'

const SnackNavigation = props => {

  const { classes, accept, runned, previousExercise, nextExercise, ...rest } = props

  function renderNavigation() {
    return (
      <div>
        <Button
          id="run"
          variant="contained"
          color="primary"
          onClick={previousExercise}
        >
          previous
        </Button>
        <Button
          id="run"
          variant="contained"
          color="primary"
          onClick={nextExercise}
        >
          next
        </Button>
      </div>
    )
  }

  function renderSnackConfirmation() {
    const correct = (
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> You've got some friends nearby, stop looking
            at your phone and find them...
          </span>
        }
        close
        color="success"
        icon={Check}
      />
    )
    const wrong = (
      <SnackbarContent
        message={
          <span>
            <b>DANGER ALERT:</b> You've got some friends nearby, stop looking at
            your phone and find them...
          </span>
        }
        color="danger"
        icon="info_outline"
      />
    )
    return accept ? correct : wrong
  }

  return (
    <div className={classes.navigation}>
      {runned ? renderSnackConfirmation() : renderNavigation()}

    </div>
  )
}

export default withStyles(snackbarStyle)(SnackNavigation)
