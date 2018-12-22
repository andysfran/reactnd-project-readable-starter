
export const onGetComments = (state) => ({
  ...state,
  isRequesting: true,
  error: undefined
});

export const onGetCommentsSuccess = (state, payload) => ({
  ...state,
  isRequesting: false,
  error: false,
  data: payload
});

export const onGetCommentsFailed = (state) => ({
  ...state,
  isRequesting: false,
  error: true
});
