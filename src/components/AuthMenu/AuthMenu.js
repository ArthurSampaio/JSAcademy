import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import Divider from '@material-ui/core/Divider'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

const AuthMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { avatarSrc, handleLogout, classes } = props
  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function logout() {
    handleLogout()
  }

  return (
    <div>
      <Avatar
        alt="User login"
        src={avatarSrc}
        className={classes.socialIcons}
        onClick={handleClick}
      />

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem component={Link} to="/">
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to="/my-answers/user">
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Minhas Respostas" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to="/my-lessons">
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Minhas Lições" />
        </StyledMenuItem>
        <StyledMenuItem onClick={logout} component={Link} to="/">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem
          href="https://github.com/ArthurSampaio/JSAcademy"
          target="_blank"
        >
          <ListItemIcon>
            <i className={classes.socialIcons + ' fab fa-github'} />
          </ListItemIcon>
          <ListItemText primary="Starred us on Github" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}

export default AuthMenu
