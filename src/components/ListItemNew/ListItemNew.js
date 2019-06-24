import React, { useState, Fragment } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SendIcon from '@material-ui/icons/Send'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import metricLessonStyle from 'assets/jss/material-kit-react/views/metricLesson.jsx'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import UtilsService from './../../services/UtilsService'
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx'

const ListItemNew = props => {
  const {
    classes,
    answered,
    lessons,
    isLesson,
    type,
    items,
    styledScroll,
    loading,
    ...rest
  } = props
  const [selectedIndex, setSelectedIndex] = useState(1)

  function createLocation(item, path, id) {
    console.log('item', item)
    const location = {
      pathname: `${path}/${id}`,
      state: {
        ...item,
      },
    }
    props.history.push(location)
  }

  function renderItems() {
    return answered && answered.length > 0 ? (
      answered.map(item => (
        <Fragment key={item._id}>
          <ListItem
            button
            selected={selectedIndex === item._id}
            onClick={event => createLocation(item, '/answers', item._id)}
          >
            <ListItemAvatar>
              <Avatar>
                <SendIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.lesson.name}
              secondary={`Respondida em ${new Date(
                item.createdAt
              ).toLocaleDateString()} | ${
                item.lesson.exercises.length
              } exercícios`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Delete">
                <SendIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Fragment>
      ))
    ) : (
      <SnackbarContent
        message={
          <div>
            <b>Não possuimos nenhuma questão para você hoje</b>
          </div>
        }
        color="warning"
        icon="info_outline"
      />
    )
  }

  function renderLessons() {
    return (
      lessons &&
      lessons.map(item => (
        <Fragment key={item._id}>
          <ListItem
            button
            selected={selectedIndex === item._id}
            onClick={event => createLocation(item, '/skill', item._id)}
          >
            <ListItemAvatar>
              <Avatar>
                <SendIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={`Criada em ${new Date(
                item.createdAt
              ).toLocaleDateString()} | ${item.exercises.length} exercícios`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Delete">
                <SendIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Fragment>
      ))
    )
  }

  function renderExercises() {
    return (
      items &&
      items.map(item => (
        <Fragment key={item._id}>
          <ListItem button selected={selectedIndex === item._id}>
            <ListItemAvatar>
              <Avatar>
                <SendIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Delete">
                <SendIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Fragment>
      ))
    )
  }

  function renderClipBoard(item) {
    const url = `${window.location.origin}/skill/${item._id}`
    return (
      <CopyToClipboard text={url} onCopy={() => console.log('copiou')}>
        <IconButton edge="end" aria-label="Copy">
          <FileCopyIcon />
        </IconButton>
      </CopyToClipboard>
    )
  }

  function renderMyLessons() {
    return items.length > 0
      ? items &&
          items.map(item => (
            <Fragment key={item._id}>
              <ListItem
                button
                onClick={event =>
                  createLocation(item, '/lesson-details', item._id)
                }
              >
                <ListItemAvatar>
                  <Tooltip
                    title={` ${
                      item.answered > 0
                        ? `${item.answered} pessoas responderam`
                        : 'Ninguém respondeu'
                    } esta lição`}
                  >
                    <Avatar
                      style={{ backgroundColor: '#7AC70C', color: '#ffffff' }}
                    >
                      {item.answered}
                    </Avatar>
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`Atualizada em ${new Date(
                    item.updatedAt
                  ).toLocaleDateString()} | ${
                    item.exercises.length
                  } exercícios`}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Copiar link">{renderClipBoard(item)}</Tooltip>
                  <Tooltip title="Ver detalhes">
                    <IconButton
                      edge="end"
                      aria-label="Delete"
                      onClick={event =>
                        createLocation(item, '/lesson-details', item._id)
                      }
                    >
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            </Fragment>
          ))
      : renderSnackbar('Você não respondeu nenhuma lição ainda')
  }

  const renderSnackbar = message => {
    return (
      <SnackbarContent
        message={
          <div>
            <b>{message}</b>
          </div>
        }
        color="warning"
        icon="info_outline"
      />
    )
  }

  const renderOwnerAvatar = item => {
    const { owner } = item

    return owner ? (
      <Avatar
        alt="User login"
        src={UtilsService.getCanvasAvatarFromEmail(owner.email)}
        className={classes.socialIcons}
      />
    ) : (
      <ListItemAvatar>
        <Avatar>
          <SendIcon />
        </Avatar>
      </ListItemAvatar>
    )
  }

  const renderListItemOwner = item => {
    const { owner } = item
    console.log('item', item)
    return owner ? (
      <ListItemText
        primary={owner.name}
        secondary={`Respondida em ${new Date(
          item.updatedAt
        ).toLocaleDateString()} | ${
          item.exercisesMetrics.length
        } exercícios | Levou ${item.totalTime / 1000} segundos `}
      />
    ) : (
      <ListItemText
        primary={`Usuário anônimo ${item.userId || ''}`}
        secondary={`Respondida em ${new Date(
          item.updatedAt
        ).toLocaleDateString()} | ${
          item.exercisesMetrics.length
        } exercícios | Levou ${item.totalTime / 1000} segundos `}
      />
    )
  }

  const renderMetrics = () => {
    console.log('aaa', items)
    return (
      items &&
      items.map(item => (
        <Fragment key={item._id}>
          <ListItem
            button
            selected={selectedIndex === item._id}
            onClick={event => createLocation(item, '/answers', item._id)}
          >
            <ListItemAvatar>{renderOwnerAvatar(item)}</ListItemAvatar>
            {renderListItemOwner(item)}
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Delete">
                <SendIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Fragment>
      ))
    )
  }

  function chooseType() {
    switch (type) {
      case 'lesson':
        return renderLessons()
      case 'exercise':
        return renderExercises()
      case 'my-lessons':
        return renderMyLessons()
      case 'metrics':
        return renderMetrics()
      default:
        return renderItems()
    }
  }

  return (
    <div style={styledScroll}>
      {loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100px',
            padding: '30px',
          }}
        >
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '0ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </div>
      )}
      <List component="nav" aria-label="Main mailbox folders">
        {chooseType()}
      </List>
    </div>
  )
}

ListItemNew.propTypes = {
  isLesson: PropTypes.bool,
  loading: PropTypes.bool,

  type: PropTypes.string,
  styledScroll: PropTypes.object,
}

ListItemNew.defaultProps = {
  isLesson: false,
  loading: false,
  type: '',
  styledScroll: { maxHeight: '600px', overflow: 'auto' },
}

export default withStyles(metricLessonStyle)(ListItemNew)
