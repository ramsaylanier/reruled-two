import db from '../db'

db.createRule = function (rule) {
  return this.client.create({
    index: 'reruled_rules',
    type: 'rule',
    body: rule.rule
  })
}

db.getRule = function (id) {
  return this.client.get({
    index: 'reruled_rules',
    type: 'rule',
    id: id
  })
}

db.getRulesByRulesetId = function (rulesetid) {
  return this.client.search({
    index: 'reruled_rules',
    type: 'rule',
    body: {
      query: {
        match: {
          ruleset: rulesetid
        }
      }
    }
  })
}

db.shapeRule = function (rule) {
  const {_source} = rule
  return {
    id: rule._id,
    author: {
      id: _source.author.id,
      username: _source.author.username
    },
    ruleset: {
      id: _source.ruleset.id
    },
    description: _source.description,
    type: _source.type,
    rules: _source.rules
  }
}

export default db
