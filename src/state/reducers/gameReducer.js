import { SET_CURRENT_GAME } from '../actions/actions'

let initialGameState = {
  currentGame: null
}

export default function uiReducer (state = initialGameState, action) {
  switch (action.type) {
    case SET_CURRENT_GAME:
      return Object.assign({}, state, {currentGame: action.currentGame})
    default:
      return state
  }
}
