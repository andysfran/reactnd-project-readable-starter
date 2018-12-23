import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import postList from './pages/PostList/reducer';
import singlePost from './pages/Post/reducer';
import postForm from './pages/Post/form/reducer';
import commentList from './components/Post/reducer';
import editModal from './components/EditModal/reducer';
import editCommentModal from './components/EditCommentModal/reducer';

const reducers = combineReducers({
  postList,
  singlePost,
  commentList,
  postForm,
  editModal,
  editCommentModal
});

export default createStore(reducers, applyMiddleware(thunk));
