
export const isRequesting = (state) => {
  const { isRequesting, error } = state.singlePost;
  if (!isRequesting && !error) {
    return false;
  }
  return true;
}
export const getData = (state) => {
  const { isRequesting, error, data } = state.singlePost;
  if (!isRequesting && !error) {
    return data;
  }
  return {};
}

export const getPostStatus = (state) => state.singlePost.deleted;
