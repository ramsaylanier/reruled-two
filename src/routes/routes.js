import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Homepage from './homepage'
import Login from './login'
import Register from './register'
import Game from './game'
import Ruleset from './ruleset'
import Profile from './profile'
import Layout from 'components/layout/default'
import { syncHistoryWithStore } from 'react-router-redux'
import authApi from '../auth/api'
import {store} from '../apollo'

function onLayoutEnter (nextState, replace, callback) {
  checkForUserSession()
  callback()
}

function checkForUserSession () {
  return authApi.checkSession().then(res => {
    if (res.data.loggedIn) {
      const user = res.data.user
      store.dispatch({type: 'LOG_IN', user: user})
    }
  })
}

function logOut (nextState, replace, callback) {
  return authApi.logout().then(res => {
    store.dispatch({type: 'LOG_OUT'})
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    })

    callback()
  })
}

function setCurrentGame (nextState, replace, callback) {
  store.dispatch({
    type: 'SET_CURRENT_GAME',
    currentGame: nextState.params.title
  })
  callback()
}

const history = syncHistoryWithStore(browserHistory, store)
const Routes = (props) => {
  return (
    <Router history={history}>
      <Route path="logout" onEnter={logOut}/>
      <Route path="/" component={Layout} onEnter={onLayoutEnter}>
      <IndexRoute component={Homepage}/>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="/user/:username" component={Profile}/>
      <Route path="/games/:title" component={Game} onEnter={setCurrentGame} />
      <Route path="/ruleset/:id" component={Ruleset} />
      </Route>
    </Router>
  )
}

export default Routes
