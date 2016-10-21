import db from '../db'

db.createRuleset = function (ruleset) {
  return this.client.create({
    index: 'reruled_rulesets',
    type: 'ruleset',
    body: ruleset
  })
}

db.findRulesets = function (title) {
  return this.client.search({
    index: 'reruled_rulesets',
    type: 'ruleset',
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
