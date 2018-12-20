import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCategories, addNewPost, resetForm } from './actions';
import { isRequestingCategories, getCategories, getSendingForm, getSavedStatus, getCreatedId } from './selectors';

import DefaultContainer from '../../../components/shared/DefaultContainer';
import { withStyles, Grid, TextField, Typography, Paper, MenuItem, Button } from '@material-ui/core';
import swal from 'sweetalert2';

class PostForm extends PureComponent {

  state = {
    author: '',
    category: '',
    title: '',
    text: ''
  }

  static getDerivedStateFromProps(props, state) {
    if (props.saved && props.idCreated !== undefined) {
      props.history.push(`/${state.category}/${props.idCreated}`);
    }
    
    return null;
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    if (params.proccess !== "new" && params.proccess !== "edit") {
      this.props.history.replace("/");
    }
    this.props.fetchCategories();
  }

  componentWillUnmount() {
    this.props.resetForm();
  }

  renderCategories = () => {
    const { categories } = this.props;
    return categories.map((item) => (
      <MenuItem key={item.path} value={item.path}>{item.name}</MenuItem>
    ));
  }

  sendRequest = () => {
    const { match: { params } } = this.props;
    if (params.proccess === "new") {
      this.registerPost();
    }
  }

  registerPost = () => {
    const { author, title, category, text } = this.state;
    if (author.trim() !== "" && title.trim() !== "" && category.trim() !== "" && text.trim() !== "") {
      const { addNewPost } = this.props;
      addNewPost(title, text, author, category);
    } else {
      swal("Hey!", "All the fields are required!", "info");
    }
  }

  render() {
    const { classes, sending } = this.props;
    return (
      <DefaultContainer>
        <Grid container className={classes.container} direction="column" alignItems="center" justify="center">
          <Typography variant="headline" className={classes.title}>New Post</Typography>
          <Grid container justify="center">
            <Grid item xs={12} md={6} lg={6} xl={6} container direction="column">
              <Paper className={classes.paper}>
                <Grid item>
                  <TextField
                    label="Author"
                    onChange={(e) => this.setState({ author: e.target.value })}
                    required={true}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Category"
                    select
                    helperText="Please select a category"
                    onChange={(e) => this.setState({ category: e.target.value })}
                    value={this.state.category}
                    className={classes.inputs}
                    required={true}
                  >
                    { this.renderCategories() }
                  </TextField>
                </Grid>

                <Grid item>
                  <TextField
                    label="Title"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    fullWidth={true}
                    className={classes.inputs}
                    required={true}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Say something"
                    type="textarea"
                    onChange={(e) => this.setState({ text: e.target.value })}
                    fullWidth={true}
                    multiline={true}
                    rows={3}
                    rowsMax={10}
                    className={classes.inputs}
                    required={true}
                  />
                </Grid>
                <Grid container justify="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={sending}
                    onClick={this.sendRequest}
                    required={true}
                  >
                    Send
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </DefaultContainer>
    );
  }

}

const styles = theme => ({
  container: {
    padding: theme.spacing.unit
  },
  title: {
    marginTop: theme.spacing.unit *3
  },
  inputs: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3
  }
});

const mapStateToProps = (state) => ({
  isRequesting: isRequestingCategories(state),
  categories: getCategories(state),
  sending: getSendingForm(state),
  saved: getSavedStatus(state),
  idCreated: getCreatedId(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCategories,
  addNewPost,
  resetForm
}, dispatch);

const ComponentStyled = withStyles(styles)(PostForm);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentStyled);
