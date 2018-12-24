import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getPosts, postVote, changeOrder } from './actions';
import { getData, isRequesting, getActualOrder } from './selector';
import { sortPosts } from '../../utils/dataUtils';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DefaultContainer from '../../components/shared/DefaultContainer';
import Post from '../../components/Post/Post';
import FakeLoading from '../../components/Post/FakeLoading';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import Reorder from '@material-ui/icons/Reorder';
import OrderOptions from '../../components/shared/OrderOptions';

class PostList extends PureComponent {

  state = {
    path: '',
    orderListOpen: false
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
    const { posts, isRequesting, order } = this.props;
    if (!isRequesting && Array.isArray(posts)) {
      const postsSorted = sortPosts(posts, order);
      return postsSorted.map((post) => (
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

  closeOrderList = () => {
    this.setState({ orderListOpen: false });
  }

  clickOrderItem = (order) => {
    this.setState({ orderListOpen: false }, () => this.props.changeOrder(order));
  }

  render() {
    const { classes } = this.props;
    return (
      <DefaultContainer>
        <Grid className={classes.container} container>
          <Grid container className={classes.containerHeader} justify="flex-end">
            <Grid item>
              <IconButton onClick={() => this.setState({ orderListOpen: true })}>
                <SvgIcon fontSize="default"><Reorder /></SvgIcon>
              </IconButton>
              Order by
            </Grid>
            <OrderOptions
              open={this.state.orderListOpen}
              onClickItem={this.clickOrderItem}
              onClose={this.closeOrderList}
            />
          </Grid>
          { this.renderPosts() }
        </Grid>
      </DefaultContainer>
    )
  }
}

const styles = theme => ({
  container: {
    margin: 0
  },
  containerHeader: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
  },
  paper: {
    margin: 10
  }
});

const mapStateToProps = (state) => ({
  posts: getData(state),
  isRequesting: isRequesting(state),
  order: getActualOrder(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ getPosts, postVote, changeOrder }, dispatch);

const PostListStyled = withStyles(styles)(PostList);

export default connect(mapStateToProps, mapDispatchToProps)(PostListStyled);
