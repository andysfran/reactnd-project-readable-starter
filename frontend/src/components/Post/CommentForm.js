import React, { PureComponent } from 'react';

import { withStyles, Typography, Grid, TextField } from '@material-ui/core';

class CommentForm extends PureComponent {

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container} direction="column">
        <Typography variant="title">Add new comment</Typography>
        <TextField
          id="standard-search"
          label="Title"
          type="text"
          className={classes.textField}
          margin="normal"
          fullWidth={true}
        />
        <TextField
          id="standard-search"
          label="Comment"
          type="textarea"
          className={classes.textField}
          margin="normal"
          fullWidth={true}
          multiline={true}
        />
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
  }
});

export default withStyles(styles)(CommentForm);
