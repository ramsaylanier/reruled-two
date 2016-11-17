import { LOG_IN, LOG_OUT, SET_CURRENT_GAME } from '../actions/actions'
import _ from 'lodash'

let initialUIState = {
  history: []
}

export default function userReducer (state = initialUIState, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, action.user)
    case LOG_OUT:
      const user = {id: null, username: null}
      return Object.assign({}, state, user)
    case SET_CURRENT_GAME:
      const history = state.history
      history.push(action.currentGame)
      const newHistory = _.uniq(history)
      return Object.assign({}, state, {
        history: newHistory
      })
    default:
      return state
  }
}
