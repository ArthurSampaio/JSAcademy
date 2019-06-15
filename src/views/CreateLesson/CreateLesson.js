import React, { useState, useEffect, Fragment } from 'react'
import clsx from 'clsx'

// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

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
import Checkbox from '@material-ui/core/Checkbox'
import CommentIcon from '@material-ui/icons/Comment'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

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
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Divider from '@material-ui/core/Divider'

import createLessonStyle from 'assets/jss/material-kit-react/views/createLessonStyle.jsx'
import ExercisesAPI from './../../services/ExercisesAPI'

//TODO: adicionar casos quando for um anonymous id
const CreateLesson = props => {
  const { classes, ...rest } = props

  const [values, setValues] = useState({
    name: '',
  })
  const [repository, setRepository] = useState([])
  const [exercises, setExercises] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState(false)

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await ExercisesAPI.getExercises()
      setRepository(res)
    }
    fetchData()
  }, [])

  const handleChangeExpanded = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  const handleClose = e => {
    setIsOpen(false)
  }

  const handleClickOpen = () => {
    setIsOpen(true)
  }

  const exerciseEmpty = () => {
    console.log(exercises.length === 0)
    return exercises.length === 0
  }

  const getAnsweredLessons = () => {
    // const answeredLesson =
    //   user.answeredLesson &&
    //   user.answeredLesson.map(item => {
    //     return {
    //       ...item,
    //       exercisesMetrics: item.exercisesMetrics.map(el => {
    //         return {
    //           ...el,
    //           exercise: item.lesson.exercises.filter(
    //             ex => ex._id === el.exercise
    //           )[0],
    //         }
    //       }),
    //     }
    //   })

    return []
  }

  const addExercisesToLessonFromRepository = () => {
    console.log('>>>>>>', checked)
    setExercises(checked)
    handleClose()
  }

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

  const renderExercises = () => {
    return (
      <Fragment>
        <ListItemNew items={exercises} type={'exercise'} {...props} />
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
                  {exercises.length === 0
                    ? 'Nenhum exercício selecionado. Clique aqui para adicionar o primeiro.'
                    : `Você adicionou ${
                        exercises.length
                      } exercícios. Clique aqui para adicionar mais exercícios.`}{' '}
                </Typography>
              </Fragment>
            }
          />
          {exercises.length === 0 && (
            <ListItemSecondaryAction>
              <Button color="danger" simple>
                Salvar
              </Button>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </List>
    )
  }

  const renderExercisesToBeChoosen = () => {
    return (
      <List className={classes.root}>
        {repository.map(value => {
          return <Fragment key={value._id}>{renderSinglePanel(value)}</Fragment>
        })}
      </List>
    )
  }

  const renderSinglePanel = value => {
    const labelId = `checkbox-list-label-${value._id}`

    return (
      <ExpansionPanel className={classes.panelContent}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div
            className={classes.listItemModal}
            style={{
              width: '100%',
            }}
          >
            <ListItem
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${value.title} | ${value.description}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="Comments"
                  onClick={handleChangeExpanded(value._id)}
                >
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails expanded={expanded === value._id}>
          <div className={classNames(classes.column, classes.codeContent)}>
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="terminal-editor"
              editorProps={{ $blockScrolling: false }}
              value={value.appraisedFunction}
              readOnly
            />
          </div>
          <div className={classNames(classes.column, classes.infoContent)}>
            <Typography className={classes.heading}>
              Descrição: {value.description}
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
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
                <CloseIcon className={classes.modalClose} />
              </IconButton>
              <h4 className={classes.modalTitle}>
                Seus exercícios cadastrados
              </h4>
            </DialogTitle>
            <DialogContent className={classes.modalBody}>
              {renderExercisesToBeChoosen()}
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button
                color="primary"
                simple
                onClick={addExercisesToLessonFromRepository}
              >
                Adicionar
              </Button>
              <Button onClick={handleClose} color="danger" simple>
                Fechar
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
