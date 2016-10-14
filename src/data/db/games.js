import db from '../db'

db.createGame = function (game) {
  const {title} = game
  return this.client.create({
    index: this.index,
    type: 'game',
    id: encodeURIComponent(title),
    body: {
      title: title
    }
  })
}
db.findGames = function () {
  return this.client.search({
    index: this.index,
    type: 'game'
  })
}

export default db
