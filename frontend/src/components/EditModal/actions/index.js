import * as types from './types';
import { actionCreator } from "../../../utils/reduxUtils";

export const openModal = (title, text) => actionCreator(types.OPEN_EDIT_MODAL, { title, text });
export const closeModal = () => actionCreator(types.CLOSE_EDIT_MODAL);
