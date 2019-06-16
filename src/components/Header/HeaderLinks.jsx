/*eslint-disable*/
import React, { useState, useEffect } from 'react'
// react components for routing our app without refresh
import { Link } from 'react-router-dom'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

// @material-ui/icons
import { CloudDownload } from '@material-ui/icons'

// core components
import Button from 'components/CustomButtons/Button.jsx'
import AuthMenu from 'components/AuthMenu/AuthMenu'
import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx'
import { AuthService } from './../../services/Auth'
import UtilsService from './../../services/UtilsService'

const HeaderLinks = props => {
  const { classes } = props
  const [currentUser, setCurrentUser] = useState(AuthService.currentUserValue)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    AuthService.currentUser.subscribe(x => setCurrentUser(x))
    const logged = currentUser && currentUser.token ? true : false
    setIsLogged(logged)
  }, [currentUser])

  function handleClick(ev) {
    console.log('click')
  }

  function renderAvatar() {
    const userDecode = AuthService.currentUserDecodeValue
    if (userDecode) {
      const avatarSrc = UtilsService.getCanvasAvatarFromEmail(userDecode.email)
      return (
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <AuthMenu
              avatarSrc={avatarSrc}
              handleLogout={AuthService.logout}
              {...props}
            />
          </ListItemAvatar>
        </ListItem>
      )
    }
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {!isLogged && (
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/login"
          >
            <CloudDownload className={classes.icons} /> Entrar
          </Button>
        )}
      </ListItem>
      {renderAvatar()}
    </List>
  )
}

export default withStyles(headerLinksStyle)(HeaderLinks)
