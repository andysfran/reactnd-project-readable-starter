import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Comment from './Comment';
import { getComments, sendComment, voteComment, deleteComment } from './actions';
import CommentForm from './CommentForm';

class CommentList extends PureComponent {

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

  render() {
    const { classes, sending } = this.props;
    return (
      <div className={classes.container}>
        <Grid container spacing={16} direction="column">
          { this.renderComments() }
        </Grid>
        <CommentForm onSendComment={this.sendComment} sending={sending} />
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
  sending: state.commentList.sendingComment
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getComments,
  sendComment,
  voteComment,
  deleteComment
}, dispatch);

const CommentListStyled = withStyles(styles)(CommentList);

export default connect(mapStateToProps, mapDispatchToProps)(CommentListStyled);