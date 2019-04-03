import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '../Menu/Menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false)

  function openMenu() {
    console.log(!open)
    setOpen(!open);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={openMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />  
            <Menu onClick={open}/>

          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            JS Academy
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
