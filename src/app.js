import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {client, store} from './apollo'
import Routes from './routes/routes'

const App = (props) => {
  return (
    <ApolloProvider client={client} store={store}>
      <Routes/>
    </ApolloProvider>
  )
}

export default App
