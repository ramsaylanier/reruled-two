
import _ from 'lodash'
import GameDatabase from '../db/games'
import UserDatabase from '../db/users'
import RulesetDatabase from '../db/rulesets'

// get the source of each elasticsearch hit
function getSource (results) {
  const sanitizedResults = _.map(results, (o) => {
    return o._source
  })

  return sanitizedResults
}

const MutationResolvers = {
  createRuleset (root, ruleset) {
    return RulesetDatabase.createRuleset(ruleset).then(res => {
      const newRulesetId = res._id
      return RulesetDatabase.getRuleset(newRulesetId).then(ruleset => {
        return RulesetDatabase.shapeRuleset(ruleset)
      })
    })
  }
}

const QueryReolvers = {
  games (root, {title}) {
    return GameDatabase.findGames(title).then(res => {
      const {hits} = res.hits
      return getSource(hits)
    })
  },
  user (root, {username}) {
    return UserDatabase.findUserByUsername(username).then(res => {
      const user = {
        id: res._id,
        username: res._source.username
      }
      return user
    })
  },
  ruleset (root, {id}) {
    return RulesetDatabase.getRuleset(id).then(ruleset => {
      return RulesetDatabase.shapeRuleset(ruleset)
    })
  },
  rulesets (root, {game}) {
    return RulesetDatabase.getRulesetsByGame(game).then(res => {
      const {hits: rulesets} = res.hits
      return _.map(rulesets, ruleset => {
        return RulesetDatabase.shapeRuleset(ruleset)
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

const RulesetResolvers = {
  game (root) {
    return GameDatabase.findGameByTitle(root.game.name).then(res => {
      const {hits} = res.hits
      return hits[0]._source
    })
  },
  author (root) {
    return UserDatabase.findUserByUsername(root.author.username).then(res => {
      const user = {
        id: res._id,
        username: res._source.username
      }
      return user
    })
  }
}

const resolvers = {
  Query: QueryReolvers,
  Ruleset: RulesetResolvers,
  Mutation: MutationResolvers
}

export default resolvers
