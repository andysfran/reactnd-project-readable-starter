import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getSinglePost, resetPost, postVote } from './actions';
import { getData, isRequesting } from './selector';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DefaultContainer from '../../components/shared/DefaultContainer';
import Post from '../../components/Post/Post';
import CommentList from '../../components/Comments/CommentList';

class PostDetails extends PureComponent {

  state = {}

  static getDerivedStateFromProps(props) {
    if ("deleted" in props.data && props.data.deleted) {
      props.history.replace('/');
    }
    return null;
  }

  componentDidMount() {
    const { match } = this.props;
    if ("post_id" in match.params && match.params.post_id !== undefined && match.params.post_id.trim() !== "") {
      this.props.getSinglePost(match.params.post_id);
    } else {
      this.props.history.replace('/');
    }
  }

  renderContent = () => {
    const { requesting, data, postVote, match } = this.props;
    if (!requesting) {
      const { match } = this.props;
      return (
        <Fragment>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Post
              onClickVote={(option) => postVote(match.params.post_id, option)}
              showBody
              {...data}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography variant="title" align="center">Comments</Typography>
          </Grid>
          <CommentList post={match.params.post_id} />
        </Fragment>
      );
    }
    return null;
  }

  render() {
    const { classes } = this.props;
     
    return (
      <DefaultContainer>
        <Grid className={classes.container} container>
          { this.renderContent() }
        </Grid>  
      </DefaultContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getSinglePost,
  resetPost,
  postVote
}, dispatch);

const mapStateToProps = (state) => ({
  requesting: isRequesting(state),
  data: getData(state)
});

const styles = () => ({
  container: {
    margin: 0
  }
});

const PostDetailsStyled = withStyles(styles)(PostDetails);
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsStyled);
