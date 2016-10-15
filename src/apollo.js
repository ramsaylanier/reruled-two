import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ApolloClient from 'apollo-client'
import { routerReducer } from 'react-router-redux'

import userReducer from './state/reducers/userReducer'

export const client = new ApolloClient()

export const store = createStore(
  combineReducers({
    user: userReducer,
    apollo: client.reducer(),
    routing: routerReducer
  }),
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
