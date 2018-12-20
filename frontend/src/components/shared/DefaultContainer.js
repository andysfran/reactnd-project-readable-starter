import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppMenu from './AppMenu';
import DrawerMenu from './DrawerMenu';

class Container extends PureComponent {

  state = {
    drawerOpen: false
  }

  openDrawer = () => {
    this.setState({ drawerOpen: true });
  }

  closeDrawer = () => {
    this.setState({ drawerOpen: false });
  }

  render() {
    const { classes, children, spacing } = this.props;
    const containerSpacing = spacing || 0;
    return (
      <div className={classes.root}>
        <AppMenu onClickMenu={this.openDrawer} />
        <DrawerMenu drawerOpen={this.state.drawerOpen} onClose={this.closeDrawer} />
        <Grid container spacing={containerSpacing}>
          { children }
        </Grid>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    flexGrow: 1,
  }
});

export default withStyles(styles)(Container);
