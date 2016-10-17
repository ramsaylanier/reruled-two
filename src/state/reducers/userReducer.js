import { LOG_IN } from '../actions/actions'

let initialUIState = {}

export default function userReducer (state = initialUIState, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, action.user)
    default:
      return state
  }
}
