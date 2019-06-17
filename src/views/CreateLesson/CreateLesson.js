import React, { useState, useEffect, Fragment } from 'react'

// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import FileCopyIcon from '@material-ui/icons/FileCopy'

import LabelIcon from '@material-ui/icons/Label'
import NoteAddIcon from '@material-ui/icons/NoteAdd'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from 'components/CustomButtons/Button.jsx'
import Checkbox from '@material-ui/core/Checkbox'
import CommentIcon from '@material-ui/icons/Comment'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'

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
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Divider from '@material-ui/core/Divider'

import createLessonStyle from 'assets/jss/material-kit-react/views/createLessonStyle.jsx'
import ExercisesAPI from './../../services/ExercisesAPI'
import LessonAPI from './../../services/LessonAPI'

const CreateLesson = props => {
  const { classes, ...rest } = props

  const [values, setValues] = useState({
    name: '',
    title: '',
    description: '',
    appraisedFunction: 'aaaaaaaaaa',
    numberTests: 6,
  })
  const [repository, setRepository] = useState([])
  const [exercises, setExercises] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [savedLesson, setSavedLesson] = useState({})
  const [isCopied, setIsCopied] = useState(false)
  const [isNewQuestion, setIsNewQuestion] = useState(false)
  const [tests, setTests] = useState({})
  const [list, setList] = useState({
    value: 0,
    array: [],
  })

  const [input, setInput] = useState(`function xpto (args) {
    
}`)

  const [isInputError, setIsInputError] = useState({
    name: false,
    title: false,
    description: false,
    appraisedFunction: false,
    numberTests: false,
  })

  const handleChange = prop => event => {
    const input = event.target.value
    setIsInputError({ ...isInputError, [prop]: input ? false : true })
    setValues({ ...values, [prop]: input })
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await ExercisesAPI.getExercises()
      setRepository(res)
    }

    repository.length === 0 && fetchData()
  }, [list])

  const handleChangeExpanded = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const onChangeEditor = newValue => {
    setInput(newValue)
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

  const addExercisesToLessonFromRepository = () => {
    setExercises(checked)
    handleClose()
  }

  const saveLesson = async () => {
    const exercisesId = exercises.map(i => i._id)
    const objectToSave = {
      name: values['name'],
      exercises: exercisesId,
    }
    const savedLesson = await LessonAPI.save(objectToSave)
    setSavedLesson(savedLesson)
    setIsCreated(true)
  }

  const createExercise = () => {
    const testsCases = []
    for (const t in tests) {
      testsCases.push(tests[t])
    }
    const exerciseObj = {
      title: values.title,
      description: values.description,
      appraisedFunction: input,
      testCases: testsCases,
    }
    console.log('obj', exerciseObj)
  }

  const renderHead = () => {
    return (
      <div className={classes.title}>
        <h2>Criar Lição</h2>
        <Divider />
        <Tooltip title="Criar questão">
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={() => setIsNewQuestion(true)}
          >
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
                  variant="body1"
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
          {exercises.length !== 0 && (
            <ListItemSecondaryAction>
              <Button
                color="primary"
                simple
                onClick={saveLesson}
                disabled={isInputError.name}
              >
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
              <h4 className={classes.headTitle}>Seus exercícios cadastrados</h4>
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

  const newExercise = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6} lg={4}>
          <Dialog
            classes={{
              root: classes.center,
            }}
            open={isNewQuestion}
            onClose={() => setIsNewQuestion(false)}
            aria-labelledby="exercise-modal-title"
            aria-describedby="exercise-modal-description"
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
                onClick={() => setIsNewQuestion(false)}
              >
                <CloseIcon className={classes.modalClose} />
              </IconButton>
              <h4 className={classes.modalTitle}>Nova lição</h4>
              <Divider />
            </DialogTitle>
            <DialogContent className={classes.modalBody}>
              {renderFormToCreateExercise()}
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button color="primary" simple onClick={createExercise}>
                Adicionar
              </Button>
              <Button
                onClick={() => setIsNewQuestion(false)}
                color="danger"
                simple
              >
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    )
  }

  const renderFormToCreateExercise = () => {
    return (
      <div className={classNames(classes.form, classes.mainRaised)}>
        <FormControl fullWidth className={classes.margin10}>
          <InputLabel htmlFor="exercise-title" error={isInputError.title}>
            Titulo do Exercício
          </InputLabel>
          <Input
            autoFocus
            id="exercise-title"
            value={values.title}
            variant="outlined"
            onChange={handleChange('title')}
            startAdornment={
              <InputAdornment position="start">
                <LabelIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin10}>
          <InputLabel
            htmlFor="exercise-description"
            error={isInputError.description}
          >
            Descrição do Exercício
          </InputLabel>
          <Input
            autoFocus
            id="exercise-description"
            value={values.description}
            onChange={handleChange('description')}
            startAdornment={
              <InputAdornment position="start">
                <LabelIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className={classNames(classes.codeContent)}>
          <InputLabel
            htmlFor="exercise-code"
            error={isInputError.description}
            style={{ marginBottom: '20px' }}
          >
            <small>Função Opinionada</small>
          </InputLabel>
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="terminal-editor"
            editorProps={{ $blockScrolling: true }}
            value={input}
            onChange={onChangeEditor}
          />
        </div>
        <FormControl className={classes.margin10}>
          <TextField
            id="standard-number"
            label="Número de testes"
            value={list.value}
            onChange={handleUpdateList}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </FormControl>
        {renderTests()}
      </div>
    )
  }

  const handleUpdateList = e => {
    const value = Number(e.target.value) <= 10 ? Number(e.target.value) : 10
    const newList = [...Array(value).keys()]
    const obj = {
      value: value,
      array: newList,
    }
    setList(obj)
  }

  const handleUpdateTest = (index, prop) => event => {
    const value = event.target.value
    const singleTest = tests[index] || {}
    const singleTestUpdate = { ...singleTest, [prop]: value }
    const testsUpdate = { ...tests, [index]: singleTestUpdate }
    setTests(testsUpdate)
  }

  const renderTests = () => {
    return (
      <div>
        {list.array.map(index => (
          <Fragment key={index}>
            <FormControl
              className={classes.margin10}
              style={{ display: 'flex', flexFlow: 'row' }}
            >
              <TextField
                id="standard-number"
                style={{ marginRight: '20px' }}
                label={`Input ${index + 1}`}
                value={(tests[index] && tests[index].input) || ''}
                onChange={handleUpdateTest(index, 'input')}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                id="standard-number"
                label={`Output ${index + 1}`}
                value={(tests[index] && tests[index].output) || ''}
                onChange={handleUpdateTest(index, 'output')}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </FormControl>
          </Fragment>
        ))}
      </div>
    )
  }

  const renderFormToCreateLesson = () => {
    return (
      <div className={classes.form}>
        <FormControl fullWidth>
          <InputLabel htmlFor="adornment-amount" error={isInputError.name}>
            Nome da Lição
          </InputLabel>
          <Input
            autoFocus
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
    )
  }

  const renderClipToBoard = () => {
    console.log('window', window.location)

    const url = `${window.location.origin}/skill/${savedLesson._id}`
    return (
      <div className={classes.clipboard}>
        <TextField
          id="outlined-full-width"
          label="URL"
          value={url}
          helperText="Compartilhe este link para sua lição ser acessível à todos"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copiar Link">
                  <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
                    <Fab
                      color="primary"
                      aria-label="Add"
                      className={classes.clipboardButton}
                    >
                      <FileCopyIcon />
                    </Fab>
                  </CopyToClipboard>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
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
              {isCreated ? renderClipToBoard() : renderFormToCreateLesson()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {renderDialog()}
      {newExercise()}
    </div>
  )
}

export default withStyles(createLessonStyle)(CreateLesson)
