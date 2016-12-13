import gql from 'graphql-tag'
import {isDuplicateRuleset} from 'components/rulesets/helpers'
import update from 'react-addons-update'

const RULESET_ADDED_SUBSCRIPTION_QUERY = gql`
  subscription onRulesetsAdded($game: String!){
    rulesetAdded(game: $game){
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

const rulesetAddedSubscriptionOptions = (nextProps) => {
  return {
    document: RULESET_ADDED_SUBSCRIPTION_QUERY,
    variables: { game: nextProps.params.title },
    updateQuery: (previousResult, { subscriptionData }) => {
      const newRuleset = subscriptionData.data.rulesetAdded
      let newResult
      if (isDuplicateRuleset(newRuleset, previousResult.rulesets)) {
        return previousResult
      } else {
        if (previousResult.rulesets) {
          newResult = update(previousResult, {
            rulesets: {
              $unshift: [newRuleset]
            }
          })
        } else {
          newResult = update(previousResult, {
            rulesets: {
              $set: [newRuleset]
            }
          })
        }
        return newResult
      }
    },
    onError: (err) => console.log(err)
  }
}

export {RULESET_ADDED_SUBSCRIPTION_QUERY, rulesetAddedSubscriptionOptions}
