import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PostList from './pages/PostList/PostList'

export default () => (
  <Router>
    <Route path="/" exact component={PostList} />
  </Router>
)
