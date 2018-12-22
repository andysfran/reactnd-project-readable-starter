import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getPosts, postVote } from './actions';
import { getData, isRequesting } from './selector';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DefaultContainer from '../../components/shared/DefaultContainer';
import Post from '../../components/Post/Post';
import FakeLoading from '../../components/Post/FakeLoading';

class PostList extends PureComponent {

  state = {
    path: ''
  };

  componentDidMount() {
    this.setState({ path: this.props.location.pathname }, () => {
      if ("category" in this.props.match.params) {
        this.props.getPosts(this.props.match.params.category);
      } else {
        this.props.getPosts();
      }
    });
  }

  componentDidUpdate() {
    if (this.state.path !== this.props.location.pathname) {
      this.setState({ path: this.props.location.pathname }, () => {
        if ("category" in this.props.match.params) {
          this.props.getPosts(this.props.match.params.category);
        } else {
          this.props.getPosts();
        }
      });
    }
  }

  renderPosts = () => {
    const { posts, isRequesting } = this.props;
    if (!isRequesting && Array.isArray(posts)) {
      return posts.map((post) => (
        <Grid key={post.id} item xs={12} md={4} lg={4} xl={4}>
          <Post
            onClickComment={() => this.props.history.push(`/${post.category}/${post.id}`)}
            onClickVote={(option) => this.props.postVote(post.id, option)}
            {...post}
          />
        </Grid>
      ));
    }
    return <FakeLoading />;
  }

  render() {
    const { classes } = this.props;
    return (
      <DefaultContainer>
        <Grid className={classes.container} container>
          { this.renderPosts() }
        </Grid>
      </DefaultContainer>
    )
  }
}

const styles = () => ({
  container: {
    margin: 0
  },
  paper: {
    margin: 10
  }
});

const mapStateToProps = (state) => ({
  posts: getData(state),
  isRequesting: isRequesting(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ getPosts, postVote }, dispatch);

const PostListStyled = withStyles(styles)(PostList);

export default connect(mapStateToProps, mapDispatchToProps)(PostListStyled);
