import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import PostList from './pages/PostList/PostList'
import InsertPost from './pages/Post/form/PostForm'
import PostDetails from './pages/Post/PostDetails'

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={PostList} />
      <Route path="/post/:proccess" exact component={InsertPost} />
      <Route path="/:category" exact component={PostList} />
      <Route path="/:category/:post_id" exact component={PostDetails} />
      <Redirect to="/" />
    </Switch>
  </Router>
)
