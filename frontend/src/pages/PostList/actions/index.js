import * as types from './types';
import { actionCreator } from '../../../utils/reduxUtils';
import axios from '../../../services/AxiosInstance';

export const getPosts = (category = '') => {
  return async (dispatch) => {
    dispatch(actionCreator(types.GET_POSTS_REQUEST));
    try {
      const endpoint = category !== ""? `http://localhost:3001/${category}/posts` : 'http://localhost:3001/posts';
      const payload = await axios.get(endpoint);
      if (payload.status === 200) {
        dispatch(actionCreator(types.GET_POSTS_SUCCESS, payload.data));
      } else {
        dispatch(actionCreator(types.GET_POSTS_FAILED));
      }
    } catch (error) {
      dispatch(actionCreator(types.GET_POSTS_FAILED));
    }
  }
}
