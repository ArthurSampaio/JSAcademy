import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
  }, list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

function Menu(props) {
  const { classes, onClick } = props;
  const sideList = (
    <div className={classes.list}>
      <h1>MenuSideBar</h1>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Drawer open={onClick} onClose={!onClick}>
        <div
          tabIndex={0}
          role="button"
          onClick={onClick}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
