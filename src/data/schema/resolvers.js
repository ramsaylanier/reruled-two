
import _ from 'lodash'
import GameDatabase from '../db/games'
import UserDatabase from '../db/users'
import RulesetDatabase from '../db/rulesets'
import RuleDatabase from '../db/rules'
import {pubsub} from '../subscriptions'

// get the source of each elasticsearch hit
function getSource (results) {
  const sanitizedResults = _.map(results, (o) => {
    return o._source
  })

  return sanitizedResults
}

const MutationResolvers = {
  createUser (root, {user}) {
    return UserDatabase.createUser(user).then(res => {
      return UserDatabase.getUser(user.username).then(user => {
        return UserDatabase.shapeUser(user)
      })
    }).catch(err => {
      const {status} = err
      if (status === 409) {
        throw new Error('Username already exists')
      }
    })
  },
  createRuleset (root, ruleset) {
    return RulesetDatabase.createRuleset(ruleset).then(res => {
      const newRulesetId = res._id
      return RulesetDatabase.getRuleset(newRulesetId).then(ruleset => {
        const newRuleset = RulesetDatabase.shapeRuleset(ruleset)
        pubsub.publish('rulesetAdded', newRuleset)
        return newRuleset
      })
    })
  },
  createRule (root, rule) {
    return RuleDatabase.createRule(rule).then(res => {
      const newRule = res._id
      return RuleDatabase.getRule(newRule).then(rule => {
        return RuleDatabase.shapeRule(rule)
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
  user (root, {username, currentUser}) {
    return UserDatabase.findUserByUsername(username).then(res => {
      const userIsCurrentUser = username === currentUser
      const user = {
        id: res._id,
        username: res._source.username,
        email: userIsCurrentUser ? res._source.email : null
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
  },
  rule (root, {id}) {
    return RuleDatabase.getRule(id).then(rule => {
      return RuleDatabase.shapeRule(rule)
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
  },
  rules (root) {
    return RuleDatabase.getRulesByRulesetId(root.id).then(res => {
      const {hits} = res.hits
      return _.map(hits, rule => {
        return RuleDatabase.shapeRule(rule)
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

const RuleResolver = {
  ruleset (root) {
    return RulesetDatabase.getRuleset(root.ruleset.id).then(ruleset => {
      return RulesetDatabase.shapeRuleset(ruleset)
    }).catch(err => {
      console.log(err)
    })
  },
  author (root) {
    return UserDatabase.findUserByUsername(root.author.username).then(res => {
      const user = {
        id: res._id,
        username: res._source.username,
        email: res._source.email
      }
      return user
    }).catch(err => {
      console.log(err)
    })
  }
}

const SubscriptionResolvers = {
  rulesetAdded (ruleset) {
    console.log('rulesetAdded')
    return ruleset
  }
}

const resolvers = {
  Query: QueryReolvers,
  Ruleset: RulesetResolvers,
  Rule: RuleResolver,
  Mutation: MutationResolvers,
  Subscription: SubscriptionResolvers
}

export default resolvers
