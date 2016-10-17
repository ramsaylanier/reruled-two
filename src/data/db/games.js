import db from '../db'

db.checkIfGamesTypeExists = function () {
  return this.client.indices.existsType({
    index: this.index,
    type: 'game'
  })
}

db.createGame = function (game) {
  const {title} = game
  return this.client.create({
    index: this.index,
    type: 'game',
    body: {
      title: title
    }
  })
}
db.findGames = function (title) {
  return this.client.search({
    index: this.index,
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

export default db
