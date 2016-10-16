import GameDatabase from '../data/db/games'
import UserDatabase from '../data/db/users'

export function checkIfGamesTypeExists () {
  return GameDatabase.checkIfGamesTypeExists()
}

export function createGame (game) {
  return GameDatabase.createGame(game)
}

export function createUser (user) {
  return UserDatabase.createUser(user)
}
