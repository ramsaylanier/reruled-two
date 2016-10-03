import elasticsearch from 'elasticsearch'
import Config from 'config'

const databasePrototype = {
  index: '',
  client: ''
}

const databaseFactory = {
  create: (options) => {
    const {index, host} = options
    return Object.create(databasePrototype, {
      index: {value: index},
      client: {value: new elasticsearch.Client({
        host: host
      })}
    })
  }
}

const GameDatabase = databaseFactory.create({index: 'games', host: Config.get('elasticsearch.host')})
GameDatabase.createGame = function (game) {
  const {title} = game
  return this.client.create({
    index: 'games',
    type: 'game',
    id: encodeURIComponent(title),
    body: {
      title: title
    }
  })
}
GameDatabase.findGames = function () {
  return this.client.search({
    index: 'games'
  })
}

export {GameDatabase}
