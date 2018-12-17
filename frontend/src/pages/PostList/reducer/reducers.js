
export const onGetPosts = (state) => ({
  ...state,
  isRequesting: true,
  error: undefined
});

export const onGetPostsSuccess = (state, payload) => ({
  ...state,
  isRequesting: false,
  error: false,
  data: payload
});

export const onGetPostsFailed = (state) => ({
  ...state,
  isRequesting: false,
  error: true
});
