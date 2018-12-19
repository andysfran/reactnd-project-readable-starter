import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Comment from './Comment';
import { getComments } from './actions';
import CommentForm from './CommentForm';

class CommentList extends PureComponent {

  componentDidMount() {
    const { post } = this.props;
    this.props.getComments(post)
  }

  renderComments = () => {
    const { data } = this.props;
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => (
        <Grid key={item.id} item xs={12} md={12} lg={12} xl={12}>
          <Comment {...item} />
        </Grid>
      ));
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid container spacing={16} direction="column">
          { this.renderComments() }
        </Grid>
        <CommentForm />
      </div>
    );
  }
}

const styles = () => ({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 10
  }
});

const mapStateToProps = (state) => ({
  requesting: state.commentList.isRequesting,
  data: state.commentList.data
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getComments
}, dispatch);

const CommentListStyled = withStyles(styles)(CommentList);

export default connect(mapStateToProps, mapDispatchToProps)(CommentListStyled);