import React from 'react'
import ApolloClient from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Home from './components/home'
import Login from './components/login'
import Layout from './components/layout/default'

const client = new ApolloClient()
const App = (props) => {
  return (
    <ApolloProvider client={client}>
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home}/>
          <Route path="login" component={Login}/>
        </Route>
      </Router>
    </ApolloProvider>
  )
}

export default App
