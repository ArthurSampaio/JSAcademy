import React, { useState, useEffect, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/Inbox'
import SendIcon from '@material-ui/icons/Send'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import DraftsIcon from '@material-ui/icons/Drafts'
import metricLessonStyle from 'assets/jss/material-kit-react/views/metricLesson.jsx'

const ListItemLesson = props => {
  const { classes, lessons, ...rest } = props
  const [selectedIndex, setSelectedIndex] = useState(1)

  console.log(lessons)
  function handleListItemClick(event, index) {
    setSelectedIndex(index)
  }

  //   function createLocation(id, item) {
  //     console.log('item', item)
  //     const location = {
  //       pathname: `/my-answers/${id}`,
  //       state: {
  //         ...item,
  //       },
  //     }
  //     props.history.push(location)
  //   }

  function renderItems() {
    return (
      lessons &&
      lessons.map(item => (
        <Fragment key={item._id}>
          <ListItem
            button
            selected={selectedIndex === item._id}
            onClick={e => console.log(e)}
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

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Main mailbox folders">
        {renderItems()}
      </List>
    </div>
  )
}

export default withStyles(metricLessonStyle)(ListItemLesson)
