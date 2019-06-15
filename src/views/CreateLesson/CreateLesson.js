import React, { useState, useEffect, Fragment } from 'react'
import clsx from 'clsx'

// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import LabelIcon from '@material-ui/icons/Label'
import NoteAddIcon from '@material-ui/icons/NoteAdd'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SendIcon from '@material-ui/icons/Send'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from 'components/CustomButtons/Button.jsx'

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import ListItemNew from 'components/ListItemNew/ListItemNew'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'

import Divider from '@material-ui/core/Divider'

import createLessonStyle from 'assets/jss/material-kit-react/views/createLessonStyle.jsx'
import UserAPI from './../../services/UserAPI'
import { AuthService } from './../../services/Auth'

//TODO: adicionar casos quando for um anonymous id
const CreateLesson = props => {
  const { classes, ...rest } = props
  const [user, setUser] = useState({})

  const [values, setValues] = useState({
    name: '',
  })
  const [exercises, setExercises] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  useEffect(() => {
    const fetchData = async () => {
      const userId = AuthService.currentUserDecodeValue._id
      const res = await UserAPI.getUser(userId)
      setUser(res)
    }
    fetchData()
  }, [])

  const renderHead = () => {
    return (
      <div className={classes.title}>
        <h2>Criar Lição</h2>
        <Divider />
        <Tooltip title="Criar questão">
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <div className={classes.subtitle}>
          <small>{`Este é o ambiente para você criar suas lições`}</small>
        </div>
      </div>
    )
  }

  const getAnsweredLessons = () => {
    const answeredLesson =
      user.answeredLesson &&
      user.answeredLesson.map(item => {
        return {
          ...item,
          exercisesMetrics: item.exercisesMetrics.map(el => {
            return {
              ...el,
              exercise: item.lesson.exercises.filter(
                ex => ex._id === el.exercise
              )[0],
            }
          }),
        }
      })

    return answeredLesson
  }

  const renderExercises = () => {
    return (
      <Fragment>
        <ListItemNew answered={getAnsweredLessons()} {...props} />
        {renderAddMoreExercises()}
      </Fragment>
    )
  }

  const renderAddMoreExercises = () => {
    return (
      <List component="nav">
        <ListItem button block alignItems="center" onClick={handleClickOpen}>
          <ListItemAvatar>
            <Avatar>
              <NoteAddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            inset
            primary={
              <Fragment>
                <Typography
                  component="span"
                  variant="body"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Adicionar questões do meu Banco
                </Typography>
              </Fragment>
            }
          />
        </ListItem>
      </List>
    )
  }

  const handleClose = e => {
    console.log('fechou', e)
    setIsOpen(false)
  }

  const handleClickOpen = () => {
    setIsOpen(true)
  }

  const renderDialog = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6} lg={4}>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal,
            }}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            keepMounted
            fullWidth
            maxWidth={'lg'}
          >
            <DialogTitle disableTypography className={classes.modalHeader}>
              <IconButton
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={handleClose}
              >
                <SendIcon className={classes.modalClose} />
              </IconButton>
              <h4 className={classes.modalTitle}>Modal title</h4>
            </DialogTitle>
            <DialogContent className={classes.modalBody}>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean. A small river named Duden flows by their
                place and supplies it with the necessary regelialia. It is a
                paradisematic country, in which roasted parts of sentences fly
                into your mouth. Even the all-powerful Pointing has no control
                about the blind texts it is an almost unorthographic life One
                day however a small line of blind text by the name of Lorem
                Ipsum decided to leave for the far World of Grammar.
              </p>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button color="transparent" simple>
                Nice Button
              </Button>
              <Button onClick={handleClose} color="danger" simple>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    )
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
            {renderHead()}
            <div className={classNames(classes.root, classes.mainRaised)}>
              <div className={classes.form}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="adornment-amount">
                    Nome da Lição
                  </InputLabel>
                  <Input
                    id="adornment-amount"
                    value={values.amount}
                    onChange={handleChange('name')}
                    startAdornment={
                      <InputAdornment position="start">
                        <LabelIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {renderExercises()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {renderDialog()}
    </div>
  )
}

export default withStyles(createLessonStyle)(CreateLesson)
