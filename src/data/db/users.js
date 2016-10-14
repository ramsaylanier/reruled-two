import db from '../db'
import bcrypt from 'bcryptjs'

function hashPassword (password) {
  let salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

db.createUser = function (user) {
  const {username, password} = user
  const passwordHash = hashPassword(password)
  return this.client.create({
    index: this.index,
    type: 'user',
    id: encodeURIComponent(username),
    body: {
      username: username,
      password: passwordHash
    }
  })
}

db.findUserByUsername = function (username) {
  return this.client.search({
    index: this.index,
    type: 'user',
    size: 1,
    body: {
      query: {
        term: {
          username: username
        }
      }
    }
  }).then(r => {
    if (r.hits.total === 0) {
      throw new Error('No user found')
    } else {
      return r.hits.hits[0]
    }
  })
}

export default db
