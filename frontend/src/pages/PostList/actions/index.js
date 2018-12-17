import * as types from './types';
import { actionCreator } from '../../../utils/reduxUtils';
import axios from '../../../services/AxiosInstance';

export const getPosts = () => {
  return async (dispatch) => {
    dispatch(actionCreator(types.GET_POSTS_REQUEST));
    try {
      const payload = await axios.get('http://localhost:3001/posts');
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
