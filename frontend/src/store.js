import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import postList from './pages/PostList/reducer';

const reducers = combineReducers({
  postList
});

export default createStore(reducers, applyMiddleware(thunk));
