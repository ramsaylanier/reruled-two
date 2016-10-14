import elasticsearch from 'elasticsearch'
import Config from '../config'

const elasticHost = Config.get().elasticsearch.host

const ReruledDatabase = {
  index: 'reruled',
  client: new elasticsearch.Client({
    host: elasticHost
  })
}

export default ReruledDatabase
// const databasePrototype = {
//   index: '',
//   client: ''
// }
//
// const databaseFactory = {
//   create: (options) => {
//     const {index, host} = options
//     return Object.create(databasePrototype, {
//       index: {value: index},
//       client: {value: new elasticsearch.Client({
//         host: host
//       })}
//     })
//   }
// }


// const GameDatabase = databaseFactory.create({index: 'games', host: elasticHost})
// const UserDatabase = databaseFactory.create({index: 'reruled_users', host: elasticHost})
//
// export {GameDatabase, UserDatabase}
