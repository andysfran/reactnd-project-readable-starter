
export const isRequesting = (state) => state.postList.isRequesting || state.postList.data.length === 0;
export const getData = (state) => state.postList.data;
