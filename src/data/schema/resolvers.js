
import _ from 'lodash'
import GameDatabase from '../db/games'
import UserDatabase from '../db/users'

// get the source of each elasticsearch hit
function getSource (results, fields) {
  const sanitizedResults = _.map(results, (o) => {
    return o._source
  })

  return sanitizedResults
}

const resolvers = {
  Query: {
    games () {
      return GameDatabase.findGames().then(res => {
        const {hits} = res.hits
        return getSource(hits)
      })
    }
  }
}

export default resolvers
