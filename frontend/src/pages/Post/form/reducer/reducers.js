
export const onGetCategories = (state) => ({
  ...state,
  categories: {
    ...state.categories,
    isRequesting: true,
    error: undefined
  }
});

export const onGetCategoriesSuccess = (state, payload) => ({
  ...state,
  categories: {
    ...state.categories,
    isRequesting: false,
    error: false,
    data: payload.categories
  }
});

export const onGetCategoriesFailed = (state) => ({
  ...state,
  categories: {
    ...state.categories,
    isRequesting: false,
    error: true
  }
});

export const onSavePost = (state) => ({
  ...state,
  sending: true,
  success: undefined
});

export const onSavePostSuccess = (state, payload) => ({
  ...state,
  sending: false,
  success: true,
  idCreated: payload.id
});

export const onSavePostFailed = (state) => ({
  ...state,
  sending: false,
  success: false
});
