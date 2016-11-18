import { PubSub, SubscriptionManager } from 'graphql-subscriptions'
import schema from './schema/schema'

const pubsub = new PubSub()
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    rulesetAdded: (options, args) => ({
      rulesetAdded: ruleset => ruleset.game === args.game
    })
  }
})

export {pubsub, subscriptionManager}
