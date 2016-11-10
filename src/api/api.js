import GameDatabase from '../data/db/games'
import UserDatabase from '../data/db/users'
import RulesetDatabase from '../data/db/rulesets'
import RuleDatabase from '../data/db/rules'

export function checkIfGamesTypeExists () {
  return GameDatabase.checkIfGamesTypeExists()
}

export function createGame (game) {
  return GameDatabase.createGame(game)
}

export function createUser (user) {
  return UserDatabase.createUser(user)
}

export function createRuleset (ruleset) {
  return RulesetDatabase.createRuleset(ruleset)
}

export function createRule (rule) {
  return RuleDatabase.createRule(rule)
}
