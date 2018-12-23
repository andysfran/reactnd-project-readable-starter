
export const onOpenModal = (state, payload) => ({
  ...state,
  typeModal: payload.type,
  isOpen: true,
  data: {
    ...state.data,
    title: payload.title,
    text: payload.text
  }
});

export const onCloseModal = (state, payload) => ({
  ...state,
  typeModal: "",
  isOpen: false,
  data: {
    ...state.data,
    title: "",
    text: ""
  }
});
