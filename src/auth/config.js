import passport from 'passport'
import {Strategy} from 'passport-local'
import {UserDatabase} from '../data/db/users'
import {authenticateUser} from './auth'

passport.use(new Strategy(
  (username, password, done) => {
    return authenticateUser(username, password).then(user => {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false, {
          message: 'Incorrect username or password.'
        })
      }
    })
  }
))

passport.serializeUser((user, done) => {
  console.log('serializeUser: ', user)
  const User = {
    id: user._id
  }
  done(null, User)
})

passport.deserializeUser((user, done) => {
  console.log('deserializeUser: ', user)
  return UserDatabase.findUserByUsername(user).then(r => {
    done(null, user)
  })
})

export default passport
