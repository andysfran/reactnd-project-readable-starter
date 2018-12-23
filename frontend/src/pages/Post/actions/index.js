import swal from 'sweetalert2';
import * as types from './types';
import { actionCreator } from '../../../utils/reduxUtils';
import axios from '../../../services/AxiosInstance';
import { closeModal } from '../../../components/EditModal/actions';

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

export const editPost = (postID, title, body) => {
  return async (dispatch) => {
    try {
      const payload = await axios.put(`http://localhost:3001/posts/${postID}`, { title, body });
      if (payload.status === 200) {
        swal("Success!", "Done! :)", "success");
        dispatch(getSinglePost(postID));
        dispatch(closeModal());
      }
    } catch (error) {
      swal("Ops!", error, "error");
    }
  }
}

export const deletePost = (postID) => {
  return async (dispatch) => {
    try {
      const payload = await axios.delete(`http://localhost:3001/posts/${postID}`);
      if (payload.status === 200) {
        swal("Success!", "Deleted!", "success");
        dispatch(actionCreator(types.ON_POST_DELETED));
      } else {
        swal("Ops!", "Error to delete this post, try again later...", "error");
      }
    } catch (error) {
      swal("Ops!", "Sorry, try again later.", "error");
    }
  }
}
