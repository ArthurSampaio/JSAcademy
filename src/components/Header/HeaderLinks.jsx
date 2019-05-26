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
import { Apps, CloudDownload } from '@material-ui/icons'

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx'
import { AuthService } from './../../services/Auth'
import md5 from 'md5'
import decode from 'jwt-decode'

const HeaderLinks = ({ ...props }) => {
  const { classes } = props
  const [currentUser, setCurrentUser] = useState(AuthService.currentUserValue)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    AuthService.currentUser.subscribe(x => setCurrentUser(x))

    const logged = currentUser && currentUser.token ? true : false
    console.log('aaa', currentUser)

    setIsLogged(logged)
  }, [currentUser, isLogged])

  function renderAvatar() {
    if (currentUser && currentUser.token) {
      console.log('curr', currentUser)
      const userDecode = decode(currentUser.token)
      console.log('123', userDecode)
      const hash = md5(userDecode.email, { encoding: 'binary' })
      const avatarSrc = `//www.gravatar.com/avatar/${hash}?s=30&d=retro`

      return (
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar
              alt="User login"
              src={avatarSrc}
              className={classes.socialIcons}
            />
          </ListItemAvatar>
        </ListItem>
      )
    }
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {isLogged ? (
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={AuthService.logout}
          >
            <CloudDownload className={classes.icons} /> Sair
          </Button>
        ) : (
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

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Starred us on github"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://github.com/ArthurSampaio/JSAcademy"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-github'} />
          </Button>
        </Tooltip>
      </ListItem>
      {renderAvatar()}
    </List>
  )
}

export default withStyles(headerLinksStyle)(HeaderLinks)
