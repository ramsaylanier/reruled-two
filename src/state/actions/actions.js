export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const OPEN_NAV = 'OPEN_NAV'
export const CLOSE_NAV = 'CLOSE_NAV'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const SET_CURRENT_GAME = 'SET_CURRENT_GAME'
export const THROW_NOTIFICATION = 'THROW_NOTIFICATION'

export function login (user) {
  return {
    type: LOG_IN,
    currentUser: user
  }
}

export function logOut () {
  return {
    type: LOG_OUT,
    currentUser: {id: null, username: null}
  }
}

export function openNav () {
  return {
    type: OPEN_NAV
  }
}

export function closeNav () {
  return {
    type: CLOSE_NAV
  }
}

export function toggleDrawer (isOpen) {
  return {
    type: TOGGLE_DRAWER,
    isOpen: isOpen
  }
}

export function setCurrentGame (currentGame) {
  return {
    type: SET_CURRENT_GAME,
    currentGame: currentGame
  }
}

export function throwNotification ({message, messageType}) {
  return {
    type: THROW_NOTIFICATION,
    message: message,
    messageType: messageType
  }
}
