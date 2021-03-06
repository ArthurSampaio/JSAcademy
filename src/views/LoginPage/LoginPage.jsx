import React, { useState, useEffect } from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import ErrorIcon from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from '@material-ui/icons/Close'

// @material-ui/icons
import Email from '@material-ui/icons/Email'
import People from '@material-ui/icons/People'
// core components
import Header from 'components/Header/Header.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import UserAPI from './../../services/UserAPI'
import { AuthService } from './../../services/Auth'

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx'

import imageLogin from 'assets/img/bg-login.png'
import imageLogout from 'assets/img/bg-logout.png'

const initPass = ''

const LoginPage = props => {
  const { classes, ...rest } = props
  const [cardAnimaton, setCardAnimaton] = useState('cardHidden')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: initPass,
    passwordConfirm: initPass,
  })
  const [isLogin, setIsLogin] = useState(true)
  const [image, setImage] = useState(imageLogin)
  const [open, setOpen] = useState(false)
  const [snack, setSnack] = useState({ message: '', open: false })

  function handleClick(message) {
    setSnack({ message: message, open: true })
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleChange = value => event => {
    setUser({
      ...user,
      [value]: event.target.value,
    })
    console.log(user.password)
    console.log(user.passwordConfirm)
  }

  const onClickHandle = event => {
    if (isLogin) {
      const userLogin = {
        email: user.email,
        password: user.password,
      }
      return AuthService.login(userLogin)
        .then(user => {
          const { from } = props.location.state || {
            from: { pathname: '/' },
          }
          props.history.push(from)
        })
        .catch(function(error) {
          handleClick(error.message)
        })
    } else {
      if (user.password === user.passwordConfirm) {
        return UserAPI.createUser(user).then(user => {
          handleClick('Usuário cadastrado com sucesso')
          setTimeout(function() {
            setIsLogin(true)
          }, 1000)
        })
      } else {
        handleClick('O password e sua confirmação não são iguais')
      }
    }
  }

  useEffect(() => {
    setTimeout(
      function() {
        setCardAnimaton('')
      }.bind(this),
      700
    )
    setUser({
      name: '',
      email: '',
      password: '',
    })
    const img = isLogin ? imageLogin : imageLogout
    setImage(img)
  }, [isLogin])

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="JavaScript Academy"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>{isLogin ? 'Login' : 'Registre-se'}</h4>
                    <div className={classes.socialLine}>
                      {isLogin ? 'ou registre-se' : 'ou faça o login'}
                      <Button
                        justIcon
                        color="transparent"
                        onClick={e => setIsLogin(!isLogin)}
                      >
                        <i className={'fas fa-sign-out-alt'} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {!isLogin && (
                      <CustomInput
                        labelText="Nome..."
                        id="first"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: handleChange('name'),
                          type: 'text',
                          value: user.name,
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: handleChange('email'),
                        type: 'email',
                        value: user.email,

                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: handleChange('password'),
                        type: 'password',
                        value: user.password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {!isLogin && user.password && (
                      <CustomInput
                        labelText="Confirme o password"
                        id="passConf"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: handleChange('passwordConfirm'),
                          type: 'password',
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                        }}
                        error={user.password !== user.passwordConfirm}
                      />
                    )}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={onClickHandle}
                    >
                      Go
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <div className={classes.error}>
            <ErrorIcon /> <span id="message-id">{snack.message}</span>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  )
}

export default withStyles(loginPageStyle)(LoginPage)
