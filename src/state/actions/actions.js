export const LOG_IN = 'LOG_IN'

export function login (user) {
  return {
    type: LOG_IN,
    currentUser: user
  }
}
