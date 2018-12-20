import * as types from '../actions/types';
import {
  onGetCategories,
  onGetCategoriesSuccess,
  onGetCategoriesFailed,
  onSavePost,
  onSavePostFailed,
  onSavePostSuccess
} from './reducers';

const initialState = {
  sending: false,
  success: undefined,
  idCreated: undefined,
  categories: {
    isRequesting: false,
    data: [],
    error: undefined
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_CATEGORIES_REQUEST:
      return onGetCategories(state);
    case types.GET_CATEGORIES_SUCCESS:
      return onGetCategoriesSuccess(state, payload);
    case types.GET_CATEGORIES_FAILED:
      return onGetCategoriesFailed(state);
    case types.SAVE_POST_REQUEST:
      return onSavePost(state);
    case types.SAVE_POST_SUCCESS:
      return onSavePostSuccess(state, payload);
    case types.SAVE_POST_FAILED:
      return onSavePostFailed(state);
    case types.RESET_FORM_STATE:
      return initialState;
    default:
      return state;
  }
}
