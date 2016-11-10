import db from '../db'
import bcrypt from 'bcryptjs'

function hashPassword (password) {
  let salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export function validateUser (user) {
  const {username, email, password} = user
  if (!username) {
    throw new Error('Enter a username')
  } else if (!email) {
    throw new Error('Enter an email address')
  } else if (!password) {
    throw new Error('Enter a password')
  }
}

db.createUser = function (user) {
  const {username, password, email} = user
  const passwordHash = hashPassword(password)
  validateUser(user)
  return this.client.create({
    index: 'reruled_users',
    type: 'user',
    id: encodeURIComponent(username),
    body: {
      email: email,
      username: username,
      password: passwordHash
    }
  })
}

db.getUser = function (username) {
  return this.client.get({
    index: 'reruled_users',
    type: 'user',
    id: username
  })
}

db.findUserByUsername = function (username) {
  return this.client.search({
    index: 'reruled_users',
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

db.shapeUser = function (user) {
  return {
    id: user._id,
    email: user._source.email,
    username: user._source.username
  }
}

export default db
