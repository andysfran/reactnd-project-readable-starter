import * as types from './types';
import { actionCreator, generateGuid } from '../../../utils/reduxUtils';
import axios from '../../../services/AxiosInstance';
import { getSinglePost } from '../../../pages/Post/actions';
import swal from 'sweetalert2';
import { closeModal } from '../../EditCommentModal/actions';

//Get all comments
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

//Send a new comment to a specific post
export const sendComment = (postID, author, text) => {
  return async (dispatch) => {
    dispatch(actionCreator(types.SEND_COMMENT_REQUEST));
    try {
      const data = {
        id: generateGuid(),
        timestamp: Date.now(),
        body: text,
        author,
        parentId: postID
      };
      const payload = await axios.post('http://localhost:3001/comments', data);
      if (payload.status === 200) {
        dispatch(actionCreator(types.SEND_COMMENT_SUCCESS));
        dispatch(getComments(postID));
        dispatch(getSinglePost(postID));
      } else {
        dispatch(actionCreator(types.SEND_COMMENT_FAILED));
      }
    } catch (error) {
      dispatch(actionCreator(types.SEND_COMMENT_FAILED));
    }
  }
}

//Vote in to specific comment
export const voteComment = (postID, commentID, option) => {
  return async (dispatch) => {
    try {
      const payload = await axios.post(`http://localhost:3001/comments/${commentID}`, { option });
      if (payload.status === 200) {
        dispatch(getComments(postID));
      } else {
        swal("Ops!", "Error to vote! Try again.", "error");
      }
    } catch (error) {
      swal("Ops!", "Error to vote!\nTry again later...", "error");
    }
  }
}

// Delete a single comment
export const deleteComment = (postID, commentID) => {
  return async (dispatch) => {
    try {
      const payload = await axios.delete(`http://localhost:3001/comments/${commentID}`);
      if (payload.status === 200) {
        swal("Wee!", "You won't see this anymore.", "success");
        dispatch(getComments(postID));
        dispatch(getSinglePost(postID));
      } else {
        swal("Ops!", "Something got wrong, try again later...", "error");
      }
    } catch (error) {
      swal("Ops!", "Something got wrong, try again later...", "error");
    }
  }
}

export const editComment = (commentID, postID, body) => {
  return async (dispatch) => {
    try {
      const data = {
        timestamp: Date.now(),
        body
      }
      const payload = await axios.put(`http://localhost:3001/comments/${commentID}`, data);
      if (payload.status === 200) {
        swal("Success!", "Done! :)", "success");
        dispatch(getComments(postID));
        dispatch(closeModal());
      }
    } catch (error) {
      swal("Ops!", error, "error");
    }
  }
}
