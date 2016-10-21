export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const OPEN_NAV = 'OPEN_NAV'
export const CLOSE_NAV = 'CLOSE_NAV'

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
