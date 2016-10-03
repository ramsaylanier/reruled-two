import defs from './definitions'
import resolvers from './resolvers'
import {makeExecutableSchema} from 'graphql-tools'

const schema = makeExecutableSchema({
  typeDefs: defs,
  resolvers: resolvers
})

export default schema
