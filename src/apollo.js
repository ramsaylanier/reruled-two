import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ApolloClient, {createNetworkInterface, addTypename} from 'apollo-client'
import { routerReducer } from 'react-router-redux'
import { Client } from 'subscriptions-transport-ws'
import userReducer from './state/reducers/userReducer'
import uiReducer from './state/reducers/uiReducer'
import gameReducer from './state/reducers/gameReducer'
import {print} from 'graphql-tag/printer'

const wsClient = new Client('ws://localhost:8080')

const networkInterface = createNetworkInterface({
  uri: '/graphql'
})

const addGraphQLSubscriptions = (networkInterface, wsClient) => Object.assign(networkInterface, {
  subscribe: (request, handler) => {
    wsClient.subscribe({
      query: print(request.query),
      variables: request.variables
    }, handler)
  },
  unsubscribe: (id) => {
    wsClient.unsubscribe(id)
  }
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id
    }
    return null
  }
})

export const store = createStore(
  combineReducers({
    user: userReducer,
    ui: uiReducer,
    game: gameReducer,
    apollo: client.reducer(),
    routing: routerReducer
  }),
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
