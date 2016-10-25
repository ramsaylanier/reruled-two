import { OPEN_NAV, CLOSE_NAV, TOGGLE_DRAWER, THROW_NOTIFICATION } from '../actions/actions'

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
        drawerContent: action.content || state.drawerContent
      })
    case THROW_NOTIFICATION:
      return Object.assign({}, state, {
        notification: {
          message: action.message,
          messageType: action.messageType
        }
      })
    default:
      return state
  }
}
