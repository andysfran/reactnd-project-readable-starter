import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';

class DrawerMenu extends PureComponent {

  render() {
    const { classes, drawerOpen, onClose } = this.props;
    return(
      <Drawer open={drawerOpen} onClose={() => onClose()}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => onClose()}
          onKeyDown={() => onClose()}
        >
          <div className={classes.list}>
            <List>
              <ListItem>
                <ListItemText primary="Categories" className={classes.listItemTitle} />
              </ListItem>
              <Divider />
              <Link to="/react" className={classes.link}>
                <ListItem button>
                  <ListItemText primary="React" />
                </ListItem>
              </Link>

              <Link to="/redux" className={classes.link}>
                <ListItem button>
                  <ListItemText primary="Redux" />
                </ListItem>
              </Link>

              <Link to="/udacity" className={classes.link}>
                <ListItem button>
                  <ListItemText primary="Udacity" />
                </ListItem>
              </Link>
            </List>
          </div>
        </div>
      </Drawer>
    );
  }
}

const styles = () => ({
  list: {
    width: 250
  },
  link: {
    textDecoration: 'none'
  },
  listItemTitle: {
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

export default withStyles(styles)(DrawerMenu);
