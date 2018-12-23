import * as types from '../actions/types';
import { onOpenModal, onCloseModal } from './reducers';

const initialState = {
  typeModal: '', // comment or post
  isOpen: false,
  data: {
    title: '',
    text: ''
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.OPEN_EDIT_MODAL:
      return onOpenModal(state, payload);
    case types.CLOSE_EDIT_MODAL:
      return onCloseModal(state);
    default:
      return state;
  }
}
