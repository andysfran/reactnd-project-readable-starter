
export const isRequesting = (state) => {
  if (!state.postList.isRequesting && state.postList.error === false) {
    return false;
  }
  return true;
}
export const getData = (state) => state.postList.data;
