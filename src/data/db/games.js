import db from '../db'

db.checkIfGamesTypeExists = function () {
  return this.client.indices.existsType({
    index: 'reruled_games',
    type: 'game'
  })
}

db.createGame = function (game) {
  const {title} = game
  return this.client.create({
    index: 'reruled_games',
    type: 'game',
    body: {
      title: title
    }
  })
}
db.findGames = function (title) {
  return this.client.search({
    index: 'reruled_games',
    type: 'game',
    body: {
      query: {
        matchPhrasePrefix: {
          title: title
        }
      }
    }
  })
}
db.findGameByTitle = function (title) {
  return this.client.search({
    index: 'reruled_games',
    type: 'game',
    body: {
      query: {
        match: {
          title: title
        }
      }
    }
  })
}

export default db
