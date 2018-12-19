import React, { PureComponent, Fragment } from 'react'

import { withStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

class Comment extends PureComponent {

  static defaultProps = {
    onVote: () => {},
    onDelete: () => {}
  }

  state = {
    editMode: false
  }

  render() {
    const { classes, author, body, voteScore, id } = this.props;
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography variant="title">{ author }</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Typography variant="headline">{ body }</Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider key={1}/>
        <ExpansionPanelActions key={2}>
          <Grid className={classes.gridIcons}>
            <IconButton onClick={() => this.props.onVote(id, "downVote")}>
              <SvgIcon fontSize="small"><ThumbDown /></SvgIcon>
            </IconButton>
            { voteScore }
            <IconButton onClick={() => this.props.onVote(id, "upVote")}>
              <SvgIcon fontSize="small"><ThumbUp /></SvgIcon>
            </IconButton>
          </Grid>
          <Button size="small">Edit comment</Button>
          <Button size="small" color="secondary" onClick={() => this.props.onDelete(id)}>
            Delete comment
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

const styles = theme => ({
  gridIcons: {
    flexGrow: 1
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexGrow: 1
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
});

export default withStyles(styles)(Comment);