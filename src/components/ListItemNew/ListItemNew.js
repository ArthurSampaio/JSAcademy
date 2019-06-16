import React, { useState, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SendIcon from '@material-ui/icons/Send'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import metricLessonStyle from 'assets/jss/material-kit-react/views/metricLesson.jsx'

const ListItemNew = props => {
  const {
    classes,
    answered,
    lessons,
    isLesson,
    type,
    items,
    styledScroll,
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
    return (
      answered &&
      answered.map(item => (
        <Fragment key={item._id}>
          <ListItem
            button
            selected={selectedIndex === item._id}
            onClick={event => createLocation(item, '/my-answers', item._id)}
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

  function chooseType() {
    switch (type) {
      case 'lesson':
        return renderLessons()
      case 'exercise':
        return renderExercises()
      default:
        return renderItems()
    }
  }

  return (
    <div style={styledScroll}>
      <List component="nav" aria-label="Main mailbox folders">
        {chooseType()}
      </List>
    </div>
  )
}

ListItemNew.propTypes = {
  isLesson: PropTypes.bool,
  type: PropTypes.string,
  styledScroll: PropTypes.object,
}

ListItemNew.defaultProps = {
  isLesson: false,
  type: '',
  styledScroll: { maxHeight: '600px', overflow: 'auto' },
}

export default withStyles(metricLessonStyle)(ListItemNew)
