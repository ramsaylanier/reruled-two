import { PubSub, SubscriptionManager } from 'graphql-subscriptions'
import schema from './schema/schema'

const pubsub = new PubSub()
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    rulesetAdded: (options, args) => {
      console.log('args: ', args)
      return (
      {
        rulesetAdded: ruleset => {
          return ruleset.game.name === args.game
        }
      })
    }
  }
})

export {pubsub, subscriptionManager}
