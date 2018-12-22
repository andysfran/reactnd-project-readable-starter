import React, { PureComponent } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
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
    onClickPost: () => {},
    onClickComment: () => {},
    onClickVote: () => {}
  }

  clickPost = (e) => {
    const tagName = e.target.tagName;
    if (tagName !== "BUTTON" && tagName !== "path" && tagName !== "svg") {
      this.props.onClickPost(this.props.id);
    }
  }

  render() {
    const { classes, title, author, commentCount, voteScore, showBody, body } = this.props;
    return (
      <Paper onClick={this.clickPost} className={classes.paper}>
        <Typography className={classes.textWrapper} variant="h5" component="h5" paragraph={true}>
          { title }
          <Typography className={classes.subtitle} variant="caption" component="p">Posted by: { author }</Typography>
        </Typography>
        
        <Grid item>
          { showBody && 
            <Typography className={classes.bodyText} variant="body2" color="textPrimary">
              { body }
            </Typography>
          }
        </Grid>

        <Grid container spacing={24}>
          <Grid item>
            <Tooltip title="Comments" aria-label="Comments">
              <IconButton onClick={this.props.onClickComment}>
                <SvgIcon fontSize="small"><Comment /></SvgIcon>
              </IconButton>
            </Tooltip>
            { commentCount > 0? commentCount : null}
          </Grid>

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
    pointerEvents: `none`
  },
  bodyText: {
    paddingRight: 20,
    paddingLeft: 20
  }
});

export default withStyles(styles)(Post)