import bcrypt from 'bcryptjs'
import UserDatabase from '../data/db/users'

const authenticateUser = (username, password) => {
  return UserDatabase.findUserByUsername(username).then((user) => {
    const authenticated = bcrypt.compareSync(password, user._source.password)
    if (authenticated) {
      return user
    } else {
      return false
    }
  }).catch(err => {
    console.log(err)
  })
}

export {authenticateUser}
