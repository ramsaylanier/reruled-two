
import _ from 'lodash'
import GameDatabase from '../db/games'
import UserDatabase from '../db/users'

// get the source of each elasticsearch hit
function getSource (results) {
  const sanitizedResults = _.map(results, (o) => {
    return o._source
  })

  return sanitizedResults
}

const resolvers = {
  Query: {
    games (root, {title}) {
      return GameDatabase.findGames(title).then(res => {
        const {hits} = res.hits
        return getSource(hits)
      })
    },
    user (root, {username}) {
      return UserDatabase.findUserByUsername(username).then(res => {
        const user = {
          id: res._id,
          username: res._source.username
        }
        console.log(user)
        return user
      })
    }
  }
}

export default resolvers
