import React, { PureComponent } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Comment from '@material-ui/icons/Comment';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

class Post extends PureComponent {

  static defaultProps = {
    id: undefined,
    title: '',
    author: '',
    body: '',
    commentCount: 0,
    voteScore: 0,
    showCommentsButton: true,
    showEditButton: false,
    onClickPost: () => {},
    onClickComment: () => {},
    onClickVote: () => {},
    onClickEdit: () => {}
  }

  clickPost = (e) => {
    const tagName = e.target.tagName;
    if (tagName !== "BUTTON" && tagName !== "path" && tagName !== "svg") {
      this.props.onClickPost(this.props.id);
    }
  }

  render() {
    const { classes, title, author, commentCount, voteScore, showBody, body, showCommentsButton, showEditButton } = this.props;
    return (
      <Paper onClick={this.clickPost} className={classes.paper}>
        <Typography className={classes.textWrapper} variant="h5" component="h5">
          { title }
        </Typography>
        <Typography className={classes.subtitle} variant="caption" component="p" paragraph={true}>
          Posted by: { author }
        </Typography>
        
        <Grid item>
          { showBody && 
            <Typography className={classes.bodyText} variant="body2" color="textPrimary">
              { body }
            </Typography>
          }
        </Grid>

        <Grid container spacing={24}>
          {showCommentsButton && 
            <Grid item>
              <Tooltip title="Comments" aria-label="Comments">
                <IconButton onClick={this.props.onClickComment}>
                  <SvgIcon fontSize="small"><Comment /></SvgIcon>
                </IconButton>
              </Tooltip>
              { commentCount > 0? commentCount : null}
            </Grid>
          }

          {showEditButton &&
            <Grid item>
              <Tooltip title="Edit post" aria-label="edit-post">
                <IconButton onClick={this.props.onClickEdit}>
                  <SvgIcon fontSize="small"><Edit /></SvgIcon>
                </IconButton>
              </Tooltip>
            </Grid>
          }

          <Grid item>
            <Tooltip title="Dislike post" aria-label="dislike-post">
              <IconButton onClick={() => this.props.onClickVote("downVote")}>
                <SvgIcon fontSize="small"><ThumbDown /></SvgIcon>
              </IconButton>
            </Tooltip>
            { voteScore }
            <Tooltip title="Like post" aria-label="like-post">
              <IconButton onClick={() => this.props.onClickVote("upVote")}>
                <SvgIcon fontSize="small"><ThumbUp /></SvgIcon>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const styles = theme => ({
  paper: {
    margin: 8,
    padding: 5,
    color: theme.palette.text.secondary
  },
  textWrapper: {
    paddingLeft: 10,
    paddingRight: 10
  },
  subtitle: {
    color: '#BDBDBD',
    pointerEvents: `none`,
    paddingLeft: 10,
    paddingRight: 10
  },
  bodyText: {
    paddingRight: 20,
    paddingLeft: 20
  }
});

export default withStyles(styles)(Post)