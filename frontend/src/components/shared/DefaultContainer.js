import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppMenu from './AppMenu'

const Container = (props) => {
  const { classes, children, spacing } = props;
  const containerSpacing = spacing || 0;
  return (
    <div className={classes.root}>
      <AppMenu />
      <Grid container spacing={containerSpacing}>
        { children }
      </Grid>
    </div>
  )
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(Container);
