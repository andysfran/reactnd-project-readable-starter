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

class Post extends PureComponent {

  static defaultProps = {
    title: '',
    author: '',
    commentCount: 0,
    voteScore: 0,
    onClickPost: () => console.log('Post'),
    onClickComment: () => console.log('Comment'),
    onClickVote: () => console.log('Vote')
  }

  render() {
    const { classes, title, author, commentCount, voteScore } = this.props;
    return (
      <Paper onClick={this.props.onClickPost} className={classes.paper}>
        <Typography className={classes.textWrapper} variant="h5" component="h5" paragraph={true}>
          { title }
          <Typography className={classes.subtitle} variant="caption" component="p">{ author }</Typography>
        </Typography>

        <Grid container spacing={24}>
          <Grid item>
            <IconButton onClick={this.props.onClickComment}>
              <SvgIcon fontSize="small"><Comment /></SvgIcon>
            </IconButton>
            { commentCount > 0? commentCount : null}
          </Grid>

          <Grid item>
            <IconButton onClick={this.props.onClickVote}>
              <SvgIcon fontSize="small"><ThumbDown /></SvgIcon>
            </IconButton>
            { voteScore }
            <IconButton onClick={this.props.onClickVote}>
              <SvgIcon fontSize="small"><ThumbUp /></SvgIcon>
            </IconButton>
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
    color: theme.palette.text.secondary,
  },
  textWrapper: {
    paddingLeft: 10,
    paddingRight: 10
  },
  subtitle: {
    color: '#BDBDBD',
  },
  button: {
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles)(Post)