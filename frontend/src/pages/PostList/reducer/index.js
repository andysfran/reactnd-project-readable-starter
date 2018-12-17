import * as types from '../actions/types';
import {
  onGetPosts,
  onGetPostsFailed,
  onGetPostsSuccess
} from './reducers';

const initialState = {
  isRequesting: false,
  data: [],
  error: undefined
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.GET_POSTS_REQUEST:
      return onGetPosts(state);
    case types.GET_POSTS_SUCCESS:
      return onGetPostsSuccess(state, payload);
    case types.GET_POSTS_FAILED:
      return onGetPostsFailed(state);
    default:
      return state;
  }
}
