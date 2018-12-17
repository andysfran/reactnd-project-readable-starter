import React, { Fragment } from 'react';
import ContentLoader from "react-content-loader";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const FakeLoading = (props) => (
  <Fragment>
    <Grid key={1} item xs={12} md={4} lg={4} xl={4}>
      <Paper className={props.classes.paper}>
        <ContentLoader 
          height={160}
          width={400}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="5%" y="15" rx="4" ry="4" width="80%" height="50.4" />
          <rect x="5%" y="80" rx="3" ry="3" width="10%" height="6.4" />
          <circle cx="10%" cy="80%" r="20" />
          <circle cx="40%" cy="80%" r="20" />
          <rect x="47.5%" y="71%" rx="3" ry="3" width="5%" height="15.4" />
          <circle cx="60%" cy="80%" r="20" />

        </ContentLoader>
      </Paper>
    </Grid>
    <Grid key={2} item xs={12} md={4} lg={4} xl={4}>
      <Paper className={props.classes.paper}>
        <ContentLoader 
          height={160}
          width={400}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="5%" y="15" rx="4" ry="4" width="80%" height="50.4" />
          <rect x="5%" y="80" rx="3" ry="3" width="10%" height="6.4" />
          <circle cx="10%" cy="80%" r="20" />
          <circle cx="40%" cy="80%" r="20" />
          <rect x="47.5%" y="71%" rx="3" ry="3" width="5%" height="15.4" />
          <circle cx="60%" cy="80%" r="20" />
        </ContentLoader>
      </Paper>
    </Grid>
  </Fragment>
);

const styles = () => ({
  paper: {
    margin: 10
  }
});

export default withStyles(styles)(FakeLoading)
