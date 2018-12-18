import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import PostList from './pages/PostList/PostList'
import PostDetails from './pages/Post/PostDetails'

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={PostList} />
      <Route path="/post/:id" exact component={PostDetails} />
      <Redirect to="/" />
    </Switch>
  </Router>
)
