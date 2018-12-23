import * as types from '../actions/types';
import {
  onGetPost,
  onGetPostError,
  onGetPostSuccess,
  onDeletePost
} from './reducers';

const initialState = {
  isRequesting: false,
  error: undefined,
  data: {},
  deleted: false
}

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.GET_POST_REQUEST:
      return onGetPost(state);
    case types.GET_POST_SUCCESS:
      return onGetPostSuccess(state, payload);
    case types.GET_POST_FAILED:
      return onGetPostError(state);
    case types.ON_POST_DELETED:
      return onDeletePost(state);
    case types.RESET_POST:
      return initialState;
    default:
      return state;
  }
}
