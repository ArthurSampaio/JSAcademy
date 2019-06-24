import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Check from '@material-ui/icons/Check'

import snackbarStyle from 'assets/jss/material-kit-react/components/snackNavigationStyle.jsx'

import CustomLinearProgress from 'components/CustomLinearProgress/CustomLinearProgress.jsx'
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx'

import Button from 'components/CustomButtons/Button.jsx'

const SnackNavigation = props => {
  const {
    classes,
    accept,
    runned,
    previousExercise,
    nextExercise,
    linearValue,
    ...rest
  } = props

  function renderNavigation() {
    return (
      <div className={classes.buttonNavigation}>
        <Button
          id="run"
          variant="contained"
          color="primary"
          onClick={previousExercise}
        >
          anterior
        </Button>
        <Button
          id="run"
          variant="contained"
          color="primary"
          onClick={nextExercise}
        >
          próximo
        </Button>
      </div>
    )
  }

  function renderSnackConfirmation() {
    const correct = (
      <SnackbarContent
        message={
          <span>
            <b>RESPOSTA CORRETA:</b> Parabéns. Você será redirecionado para a
            próxima questão em instantes.
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
            <b>RESPOSTA INCORRETA:</b> :( clique <b>Clear</b> para tentar
            novamente.
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
      <CustomLinearProgress
        variant="determinate"
        color="warning"
        value={linearValue}
      />
      {runned ? renderSnackConfirmation() : renderNavigation()}
    </div>
  )
}

export default withStyles(snackbarStyle)(SnackNavigation)
