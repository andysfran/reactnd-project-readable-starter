import React, { PureComponent, Fragment } from 'react';
import swal from 'sweetalert2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getSinglePost, resetPost, postVote, editPost, deletePost } from './actions';
import { openModal } from '../../components/EditModal/actions';
import { getData, isRequesting, getPostStatus } from './selector';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DefaultContainer from '../../components/shared/DefaultContainer';
import Post from '../../components/Post/Post';
import CommentList from '../../components/Comments/CommentList';
import EditModal from '../../components/EditModal/EditModal';

class PostDetails extends PureComponent {

  state = {}

  static getDerivedStateFromProps(props) {
    if (props.deleted) {
      props.history.replace('/');
    }
    
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

  componentWillUnmount() {
    this.props.resetPost();
  }

  openEditModal = () => {
    const { openModal, data } = this.props;
    openModal(data.title, data.body);
  }

  confirmEditPost = (title, text) => {
    if (title.trim() !== "" && text.trim() !== "") {
      const { match, editPost } = this.props;
      editPost(match.params.post_id, title, text);
    } else {
      swal("Hey!", "The fields cannot be empty!", "warning");
    }
  }

  deletePost = () => {
    const { match: { params }, deletePost } = this.props;
    deletePost(params.post_id);
  }

  renderContent = () => {
    const { requesting, data, postVote } = this.props;
    if (!requesting) {
      const { match } = this.props;
      return (
        <Fragment>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Post
              onClickVote={(option) => postVote(match.params.post_id, option)}
              onClickEdit={this.openEditModal}
              onClickDelete={this.deletePost}
              showBody
              showEditButton
              showDeleteButton
              showCommentsButton={false}
              rightText={`${data.commentCount} comments`}
              {...data}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography variant="title" align="center">Comments</Typography>
          </Grid>
          <CommentList post={match.params.post_id} />
          <EditModal onConfirm={this.confirmEditPost} />
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
  postVote,
  openModal,
  editPost,
  deletePost
}, dispatch);

const mapStateToProps = (state) => ({
  requesting: isRequesting(state),
  data: getData(state),
  deleted: getPostStatus(state)
});

const styles = () => ({
  container: {
    margin: 0
  }
});

const PostDetailsStyled = withStyles(styles)(PostDetails);
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsStyled);
