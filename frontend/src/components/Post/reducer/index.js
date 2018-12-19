import * as types from '../actions/types';
import {
  onGetComments,
  onGetCommentsFailed,
  onGetCommentsSuccess
} from './reducers'

const initialState = {
  isRequesting: false,
  error: undefined,
  data: [],
  sendingComment: false
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.GET_COMMENTS_REQUEST:
      return onGetComments(state);
    case types.GET_COMMENTS_SUCCESS:
      return onGetCommentsSuccess(state, payload);
    case types.GET_COMMENTS_FAILED:
      return onGetCommentsFailed(state);
    case types.SEND_COMMENT_REQUEST:
      return { ...state, sendingComment: true };
    case types.SEND_COMMENT_SUCCESS:
      return { ...state, sendingComment: false };
    case types.SEND_COMMENT_FAILED:
      return { ...state, sendingComment: false };
    default:
      return state;
  }
}
