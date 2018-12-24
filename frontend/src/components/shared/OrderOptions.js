import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';

const order = [
  { name: 'Vote points (Asc)', key: 'vote' },
  { name: 'Vote points (Desc)', key: '-vote' },
  { name: 'Date (Asc)', key: 'date' },
  { name: 'Date (Desc)', key: '-date' },
  { name: 'None', key: 'none' }
]
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class OrderOptions extends PureComponent {
  handleClose = () => {
    this.props.onClose();
  };

  handleListItemClick = value => {
    this.props.onClickItem(value);
  };

  render() {
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <DialogTitle id="simple-dialog-title">Order by:</DialogTitle>
        <div>
          <List>
            {order.map(item => (
              <ListItem button onClick={() => this.handleListItemClick(item.key)} key={item.key}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

OrderOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(OrderOptions);