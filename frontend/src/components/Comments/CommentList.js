import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert2';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Comment from './Comment';
import { getComments, sendComment, voteComment, deleteComment, editComment } from './actions';
import CommentForm from './CommentForm';
import EditCommentModal from '../EditCommentModal/EditCommentModal';
import { openModal } from '../EditCommentModal/actions';

class CommentList extends PureComponent {

  state = {
    idSelected: 0
  }

  componentDidMount() {
    const { post } = this.props;
    this.props.getComments(post)
  }

  renderComments = () => {
    const { data } = this.props;
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => !item.deleted && (
        <Grid key={item.id} item xs={12} md={12} lg={12} xl={12}>
          <Comment
            onVote={this.voteComment}
            onDelete={this.deleteComment}
            onEdit={() => this.openModalEdit(item.id, item.body)}
            {...item}
          />
        </Grid>
      ));
    }
    return null;
  }

  deleteComment = (comment) => {
    const { post, deleteComment } = this.props;
    deleteComment(post, comment);
  }

  voteComment = (comment, option) => {
    const { post, voteComment } = this.props;
    voteComment(post, comment, option);
  }

  sendComment = (title, comment) => {
    const { sendComment, post } = this.props;
    sendComment(post, title, comment);
  }

  openModalEdit = (commentID, body) => {
    const { openModal } = this.props;
    this.setState({ idSelected: commentID }, () => openModal(body));
  }

  confirmEditComment = (text) => {
    if (text.trim() !== "") {
      const { idSelected } = this.state;
      const { post, editComment } = this.props;
      editComment(idSelected, post, text);
    } else {
      swal("Hey!", "The fields cannot be empty!", "warning");
    }
  }

  render() {
    const { classes, sending } = this.props;
    return (
      <div className={classes.container}>
        <Grid container spacing={16} direction="column">
          { this.renderComments() }
        </Grid>
        <CommentForm onSendComment={this.sendComment} sending={sending} />
        <EditCommentModal onConfirm={(text) => this.confirmEditComment(text)} />
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
  data: state.commentList.data,
  sending: state.commentList.sendingComment,
  modalOpen: state.editCommentModal.isOpen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getComments,
  sendComment,
  voteComment,
  deleteComment,
  openModal,
  editComment
}, dispatch);

const CommentListStyled = withStyles(styles)(CommentList);

export default connect(mapStateToProps, mapDispatchToProps)(CommentListStyled);