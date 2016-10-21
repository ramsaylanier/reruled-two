import { LOG_IN, LOG_OUT } from '../actions/actions'

let initialUIState = {}

export default function userReducer (state = initialUIState, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, action.user)
    case LOG_OUT:
      const user = {id: null, username: null}
      return Object.assign({}, state, user)
    default:
      return state
  }
}
