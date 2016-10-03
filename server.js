import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config'
import bodyParser from 'body-parser'
import {loadGamesFromTestData} from './utils/utils'
import {apolloExpress, graphiqlExpress} from 'apollo-server'
import graphQLSchema from './src/data/schema/schema'

const isDev = process.env.NODE_ENV !== 'production'
const port = isDev ? 3000 : process.env.PORT
const app = express()

app.use('/graphql', bodyParser.json(), apolloExpress({schema: graphQLSchema}))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

if (isDev) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: true,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.get('*', function response (req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  })
} else {
  app.use(express.static(path.join(__dirname, '/dist')))
  app.get('*', function response (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

app.listen(port, '0.0.0.0', function onStart (err) {
  if (err) {
    console.log(err)
  } else {
    loadGamesFromTestData()
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})
