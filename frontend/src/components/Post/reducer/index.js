import * as types from '../actions/types';
import {
  onGetComments,
  onGetCommentsFailed,
  onGetCommentsSuccess
} from './reducers'

const initialState = {
  isRequesting: false,
  error: undefined,
  data: []
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.GET_COMMENTS_REQUEST:
      return onGetComments(state);
    case types.GET_COMMENTS_SUCCESS:
      return onGetCommentsSuccess(state, payload);
    case types.GET_COMMENTS_FAILED:
      return onGetCommentsFailed(state);
    default:
      return state;
  }
}
