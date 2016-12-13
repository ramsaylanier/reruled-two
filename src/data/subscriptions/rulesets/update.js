import gql from 'graphql-tag'
import update from 'react-addons-update'
import {findIndex} from 'lodash'

const RULESET_UPDATED_SUBSCRIPTION_QUERY = gql`
  subscription onRulesetsUpdated{
    rulesetUpdated{
      id
      name
      author{
        id
      }
      rules{
        id
        type
      }
    }
  }
`

const rulesetUpdatedSubscriptionOptions = (nextProps) => {
  return {
    document: RULESET_UPDATED_SUBSCRIPTION_QUERY,
    updateQuery: (previousResult, { subscriptionData }) => {
      const updatedRuleset = subscriptionData.data.rulesetUpdated
      return update(previousResult, {
        rulesets: {
          $apply: rulesets => {
            const index = findIndex(rulesets, ruleset => {
              return ruleset.id === updatedRuleset.id
            })
            rulesets[index] = updatedRuleset
          }
        }
      })
    },
    onError: (err) => console.log(err)
  }
}

export {RULESET_UPDATED_SUBSCRIPTION_QUERY, rulesetUpdatedSubscriptionOptions}
