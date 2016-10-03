import {GameDatabase} from '../data/db'

export function createGame (game) {
  GameDatabase.createGame(game)
}
