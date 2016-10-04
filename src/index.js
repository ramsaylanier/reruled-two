import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './app'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  rootEl
)

if (module.hot) {
  console.log('hot')
  module.hot.accept('./app', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./app').default
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    )
  })
}
