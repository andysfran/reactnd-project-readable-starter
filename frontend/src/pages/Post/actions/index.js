import swal from 'sweetalert2';
import * as types from './types';
import { actionCreator } from '../../../utils/reduxUtils';
import axios from '../../../services/AxiosInstance';

export const resetPost = () => actionCreator(types.RESET_POST);

export const getSinglePost = (postID) => {
  return async (dispatch) => {
    dispatch(actionCreator(types.GET_POST_REQUEST));
    try {
      const payload = await axios.get(`http://localhost:3001/posts/${postID}`);
      if (payload.status === 200) {
        dispatch(actionCreator(types.GET_POST_SUCCESS, payload.data));
      } else {
        dispatch(actionCreator(types.GET_POST_FAILED));
      }
    } catch (error) {
      dispatch(actionCreator(types.GET_POST_FAILED));
    }
  }
}

export const postVote = (postID, option) => {
  return async (dispatch) => {
    try {
      const payload = await axios.post(`http://localhost:3001/posts/${postID}`, { option });
      if (payload.status === 200) {
        dispatch(getSinglePost(postID));
      } else {
        swal("Ops!", "Error to vote! Try again.", "error");
      }
    } catch (error) {
      swal("Ops!", "Error to vote!\nTry again later...", "error");
    }
  }
}
