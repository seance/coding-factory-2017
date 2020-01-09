import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/app'
import Home from './components/home'
import Register from './components/register'
import GameUi from './components/game-ui'
import Scoreboard from './components/scoreboard'
import Boom from './components/boom'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/register" component={Register}/>
      <Route path="/game/:teamId" component={GameUi}/>
      <Route path="/scoreboard" component={Scoreboard}/>
      <Route path="/boom" component={Boom}/>
    </Route>
  </Router>
)
