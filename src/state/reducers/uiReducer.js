import { OPEN_NAV, CLOSE_NAV } from '../actions/actions'

let initialUIState = {
  navOpen: false
}

export default function uiReducer (state = initialUIState, action) {
  switch (action.type) {
    case OPEN_NAV:
      return Object.assign({}, state, {navOpen: true})
    case CLOSE_NAV:
      return Object.assign({}, state, {navOpen: false})
    default:
      return state
  }
}
