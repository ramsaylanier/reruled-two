import GameDatabase from '../data/db/games'
import UserDatabase from '../data/db/users'

export function createGame (game) {
  GameDatabase.createGame(game)
}

export function createUser (user) {
  UserDatabase.createUser(user)
}
