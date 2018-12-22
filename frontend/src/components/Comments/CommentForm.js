import React, { PureComponent } from 'react';
import Swal from 'sweetalert2';

import { withStyles, Typography, Grid, TextField, Paper , Button } from '@material-ui/core';

class CommentForm extends PureComponent {

  static defaultProps = {
    onSendComment: () => {},
    sending: false
  }

  state = {
    title: '',
    comment: ''
  }

  sendComment = () => {
    const { title, comment } = this.state;
    if (title.trim() !== "" && comment.trim() !== "") {
      this.props.onSendComment(title, comment);
      this.setState({ title: '', comment: '' });
    } else {
      Swal({
        title: 'Hey!',
        text: 'Title and Comment fields are required.',
        type: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }

  render() {
    const { classes, sending } = this.props;
    return (
      <Grid container className={classes.container} direction="column" alignItems="center">
        <Typography variant="title">New comment</Typography>
        <Grid item xs={12} md={8} lg={8} xl={8}>
          <Paper>
            <TextField
              id="standard-search"
              label="Author"
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <TextField
              id="standard-search"
              label="Comment"
              type="textarea"
              className={classes.textField}
              margin="normal"
              multiline={true}
              onChange={(e) => this.setState({ comment: e.target.value })}
            />

            <Grid container direction="column" alignItems="flex-end">
              {sending?
                <Button variant="contained" color="primary" className={classes.button} disabled>
                  Sending...
                </Button>
                :
                <Button variant="contained" color="primary" className={classes.button} onClick={this.sendComment}>
                  Send
                </Button>
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '96%'
  },
  button: {
    margin: theme.spacing.unit
  },
  progress: {
    margin: 0,
    width: '20 !important',
    height: '20 !important',
    color: 'white'
  },
});

export default withStyles(styles)(CommentForm);
