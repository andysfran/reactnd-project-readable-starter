import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import postList from './pages/PostList/reducer';
import singlePost from './pages/Post/reducer';
import postForm from './pages/Post/form/reducer';
import commentList from './components/Post/reducer';

const reducers = combineReducers({
  postList,
  singlePost,
  commentList,
  postForm
});

export default createStore(reducers, applyMiddleware(thunk));
