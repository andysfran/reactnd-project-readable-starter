import * as types from './types';
import swal from 'sweetalert2';
import axios from '../../../../services/AxiosInstance';
import { actionCreator, generateGuid } from '../../../../utils/reduxUtils';

export const resetForm = () => actionCreator(types.RESET_FORM_STATE);

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(actionCreator(types.GET_CATEGORIES_REQUEST));
    try {
      const payload = await axios.get("http://localhost:3001/categories");
      if (payload.status === 200) {
        dispatch(actionCreator(types.GET_CATEGORIES_SUCCESS, payload.data));
      } else {
        dispatch(actionCreator(types.GET_CATEGORIES_FAILED));
      }
    } catch (error) {
      dispatch(actionCreator(types.GET_CATEGORIES_FAILED));
    }
  }
}

export const addNewPost = (title, body, author, category) => {
  return async (dispatch) => {
    dispatch(actionCreator(types.SAVE_POST_REQUEST));
    try {
      const data = {
        id: generateGuid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
      };
      const payload = await axios.post("http://localhost:3001/posts", data);
      if (payload.status === 200) {
        swal("Wee!", "Post created!", "success");
        dispatch(actionCreator(types.SAVE_POST_SUCCESS, payload.data));
      } else {
        swal("Ops!", "Houston we have a problem!\nSorry but we got an error to create your post. Try again later...", "error");
        dispatch(actionCreator(types.SAVE_POST_FAILED));
      }
    } catch (error) {
      swal("Ops!", "Houston we have a problem!\nSorry but we got an error to create your post. Try again later...", "error");
      dispatch(actionCreator(types.SAVE_POST_FAILED));
    }
  }
}
