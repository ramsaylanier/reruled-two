import { PubSub, SubscriptionManager } from 'graphql-subscriptions'
import schema from './schema/schema'

const pubsub = new PubSub()
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    rulesetAdded: (options, args) => {
      return (
      {
        rulesetAdded: ruleset => {
          return ruleset.game.name === args.game
        }
      })
    },
    rulesetUpdated: (options, args) => {
      return (
      {
        rulesetUpdated: ruleset => {
          return ruleset
        }
      })
    },
    ruleAdded: (options, args) => {
      return (
      {
        ruleAdded: rule => {
          return rule.ruleset.id === args.rulesetId
        }
      })
    }
  }
})

export {pubsub, subscriptionManager}
