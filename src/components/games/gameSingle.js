import React from 'react'
import {Page, PageHeader, PageContent} from 'components/layout/pages'
import DrawerToggleButton from 'components/buttons/drawerToggleButton'
import NewRulesetForm from 'components/rulesets/newRulesetForm'
import {List, ListItem} from 'components/layout/list'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './game.scss'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
import {addGameToHistory} from 'state/actions/actions'
import update from 'react-addons-update'

const rulesetSubscription = gql`
  subscription onRulesetsAdded($game: String){
    rulesetAdded(game: $game){
      id
      name
    }
  }
`
class GameSingle extends React.Component {

  constructor (props) {
    super(props)
    this.subscription = null
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    if (!this.subscription && !nextProps.loading) {
      this.subscription = this.props.subscribeToMore({
        document: rulesetSubscription,
        variables: { game: this.props.params.title },
        updateQuery: (previousResult, { subscriptionData }) => {
          const newRuleset = subscriptionData.data.rulesetAdded
          const newResult = update(previousResult, {
            rulesets: {
              $unshift: [newRuleset]
            }
          })
          return newResult
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
                  <ListItem>
                    <Link to={`/ruleset/${ruleset.id}`}>{ruleset.name}</Link>
                  </ListItem>
                )
              })}
            </List>
          }
        </PageContent>
      </Page>
    )
  }
}

const rulesetQuery = gql`
  query getRulesetsForGame($game: String){
    rulesets(game: $game){
      id
      name
    }
  }
`

const GameSingleWithStyle = CSSModules(GameSingle, styles)
const GameSingleWithData = graphql(rulesetQuery, {
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
})(GameSingleWithStyle)

function mapDisatchToProps (dispatch) {
  return {
    addGameToHistory: (game, user) => {
      dispatch(addGameToHistory(game, user))
    }
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    apollo: state.apollo
  }
}

export default connect(mapStateToProps, mapDisatchToProps)(GameSingleWithData)
