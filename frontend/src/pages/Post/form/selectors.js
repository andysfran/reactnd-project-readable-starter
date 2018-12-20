
export const isRequestingCategories = (state) => {
  const { postForm: { categories: { data, isRequesting } } } = state;
  if (!isRequesting && Array.isArray(data) && data.length > 0) {
    return false;
  }
  return true;
}

export const getCategories = (state) => {
  const { postForm: { categories } } = state;
  if (!categories.isRequesting && categories.error === false) {
    return categories.data;
  }
  return [];
}

export const getSendingForm = (state) => state.postForm.sending;
export const getSavedStatus = (state) => state.postForm.success;
export const getCreatedId = (state) => state.postForm.idCreated;
