import GameDatabase from '../data/db/games'
import UserDatabase from '../data/db/users'
import RulesetDatabase from '../data/db/rulesets'

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
