
export const onOpenModal = (state, payload) => ({
  ...state,
  isOpen: true,
  data: {
    ...state.data,
    text: payload.text
  }
});

export const onCloseModal = (state) => ({
  ...state,
  isOpen: false,
  data: {
    ...state.data,
    text: ""
  }
});
