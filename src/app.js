import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Homepage from './components/layout/pages/homepage'
import Login from './components/layout/pages/login'
import Register from './components/layout/pages/register'
import GameSingle from './components/games/gameSingle'
import RulesetSingle from './components/rulesets/rulesetSingle'
import UserProfile from './components/profile/UserProfile'
import Layout from './components/layout/default'
import {client, store} from './apollo'
import { syncHistoryWithStore } from 'react-router-redux'
import authApi from './auth/api'

function checkForUserSession (nextState, replace, callback) {
  return authApi.checkSession().then(res => {
    if (res.data.loggedIn) {
      const user = res.data.user
      store.dispatch({type: 'LOG_IN', user: user})
    }

    callback()
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
const App = (props) => {
  return (
    <ApolloProvider client={client} store={store}>
      <Router history={history}>
        <Route path="logout" onEnter={logOut}/>
        <Route path="/" component={Layout} onEnter={checkForUserSession}>
          <IndexRoute component={Homepage}/>
          <Route path="login" component={Login}/>
          <Route path="register" component={Register}/>
          <Route path="/user/:username" component={UserProfile}/>
          <Route path="/games/:title" component={GameSingle} onEnter={setCurrentGame} />
          <Route path="/ruleset/:id" component={RulesetSingle} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

export default App
