import * as types from './types';
import { actionCreator } from '../../../utils/reduxUtils';
import axios from '../../../services/AxiosInstance';

export const getComments = (postID) => {
  return async (dispatch) => {
    dispatch(actionCreator(types.GET_COMMENTS_REQUEST));
    try {
      const payload = await axios.get(`http://localhost:3001/posts/${postID}/comments`);
      if (payload.status === 200) {
        dispatch(actionCreator(types.GET_COMMENTS_SUCCESS, payload.data));
      } else {
        dispatch(actionCreator(types.GET_COMMENTS_FAILED));
      }
    } catch (error) {
      dispatch(actionCreator(types.GET_COMMENTS_FAILED));
    }
  }
}
