import db from '../db'

db.createRuleset = function (ruleset) {
  console.log(ruleset)
  return this.client.create({
    index: 'reruled_rulesets',
    type: 'ruleset',
    body: ruleset.ruleset
  })
}

db.getRuleset = function (id) {
  return this.client.get({
    index: 'reruled_rulesets',
    type: 'ruleset',
    id: id
  })
}

db.getRulesetsByGame = function (game) {
  console.log(game)
  return this.client.search({
    index: 'reruled_rulesets',
    type: 'ruleset',
    body: {
      query: {
        match: {
          game: game
        }
      }
    }
  })
}

db.shapeRuleset = function (ruleset) {
  const {_source} = ruleset
  return {
    id: ruleset._id,
    name: _source.name,
    author: {
      id: _source.author.id,
      username: _source.author.username
    },
    game: {
      name: _source.game
    },
    rules: _source.rules
  }
}

export default db
