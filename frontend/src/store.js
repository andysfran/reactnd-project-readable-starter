import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import postList from './pages/PostList/reducer';
import singlePost from './pages/Post/reducer';

const reducers = combineReducers({
  postList,
  singlePost
});

export default createStore(reducers, applyMiddleware(thunk));
