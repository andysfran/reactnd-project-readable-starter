import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getPosts } from './actions';
import { getData, isRequesting } from './selector';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DefaultContainer from '../../components/shared/DefaultContainer';
import Post from '../../components/Post/Post';
import FakeLoading from '../../components/Post/FakeLoading';

class PostList extends PureComponent {

  componentDidMount() {
    this.props.getPosts();
  }

  renderPosts = () => {
    const { posts, isRequesting } = this.props;
    if (!isRequesting) {
      return posts.map((post) => (
        <Grid key={post.id} item xs={12} md={4} lg={4} xl={4}>
          <Post {...post} />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ getPosts }, dispatch);

const PostListStyled = withStyles(styles)(PostList);

export default connect(mapStateToProps, mapDispatchToProps)(PostListStyled);
