import { OPEN_NAV, CLOSE_NAV, TOGGLE_DRAWER } from '../actions/actions'

let initialUIState = {
  navOpen: false,
  drawerOpen: false,
  drawerContent: null
}

export default function uiReducer (state = initialUIState, action) {
  switch (action.type) {
    case OPEN_NAV:
      return Object.assign({}, state, {navOpen: true})
    case CLOSE_NAV:
      return Object.assign({}, state, {navOpen: false})
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: action.isOpen,
        drawerContent: action.content
      })
    default:
      return state
  }
}
