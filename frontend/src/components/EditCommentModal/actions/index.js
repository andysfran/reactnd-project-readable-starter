import * as types from './types';
import { actionCreator } from "../../../utils/reduxUtils";

export const openModal = (text) => actionCreator(types.OPEN_EDIT_MODAL, { text });
export const closeModal = () => actionCreator(types.CLOSE_EDIT_MODAL);
