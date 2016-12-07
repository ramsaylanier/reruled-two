import React from 'react'
import {Page, PageHeader, PageContent} from 'components/layout/pages'
import DrawerToggleButton from 'components/buttons/drawerToggleButton'
import NewRulesetForm from 'components/rulesets/newRulesetForm'
import RulesetItem from 'components/rulesets/rulesetItem'
import {List} from 'components/layout/list'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
import {addGameToHistory} from 'state/actions/actions'
import update from 'react-addons-update'
import {isDuplicateRuleset} from 'components/rulesets/helpers'
import CSSModules from 'react-css-modules'
import styles from 'components/games/game.scss'

function mapStateToProps (state) {
  return {
    user: state.user,
    apollo: state.apollo
  }
}

function mapDisatchToProps (dispatch) {
  return {
    addGameToHistory: (game, user) => {
      dispatch(addGameToHistory(game, user))
    }
  }
}

const rulesetSubscription = gql`
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

const rulesetQuery = gql`
  query getRulesetsForGame($game: String!){
    rulesets(game: $game){
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

@connect(mapStateToProps, mapDisatchToProps)
@graphql(rulesetQuery, {
  options: (props) => {
    return ({
      variables: {
        game: props.params.title
      }
    })
  },
  props: ({ data: { loading, rulesets, subscribeToMore } }) => ({
    loading, rulesets, subscribeToMore
  })
})
@CSSModules(styles)
class Game extends React.Component {

  constructor (props) {
    super(props)
    this.subscription = null
  }

  componentWillReceiveProps (nextProps) {
    if (!this.subscription && !nextProps.loading) {
      this.subscription = this.props.subscribeToMore({
        document: rulesetSubscription,
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
      })
    }
  }

  render () {
    const {user, params, rulesets} = this.props
    const {title} = params
    return (
      <Page>
        <PageHeader type="primary">
          <h1>{title}</h1>
          {user.id &&
            <DrawerToggleButton drawerContent={<NewRulesetForm/>}/>
          }
        </PageHeader>
        <PageContent>
          {rulesets &&
            <List type="no-style">
              {rulesets.map(ruleset => {
                return (
                  <RulesetItem key={ruleset.id} ruleset={ruleset} />
                )
              })}
            </List>
          }
        </PageContent>
      </Page>
    )
  }
}

export default Game
