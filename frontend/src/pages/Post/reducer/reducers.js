
export const onGetPost = (state) => ({
  ...state,
  isRequesting: true,
  error: undefined,
});

export const onGetPostSuccess = (state, payload) => ({
  ...state,
  isRequesting: false,
  error: false,
  data: payload
});

export const onGetPostError = (state) => ({
  ...state,
  isRequesting: false,
  error: true
});

export const onDeletePost = (state) => ({
  ...state,
  deleted: true
});
