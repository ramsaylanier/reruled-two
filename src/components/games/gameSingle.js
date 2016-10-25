import React from 'react'
import Page from 'components/layout/pages/page'
import NewRulesetButton from 'components/buttons/newRulesetButton'
import {List, ListItem} from 'components/layout/list'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './game.scss'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'

const GameSingle = (props) => {
  const {user, data} = props
  const {rulesets} = data
  return (
    <Page>
      <h1>{props.params.title}</h1>

      {user.id &&
        <NewRulesetButton/>
      }

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
    </Page>
  )
}

const rulesetQuery = gql`
  query getRulesetsForGame($game: String){
    rulesets(game: $game){
      id
      name
    }
  }
`

const GameSingleWithData = graphql(rulesetQuery, {
  options: (props) => {
    return ({
      variables: {
        game: props.params.title
      }
    })
  }
})(GameSingle)

function mapStateToProps (state) {
  return {
    user: state.user,
    apollo: state.apollo
  }
}

export default connect(mapStateToProps)(CSSModules(GameSingleWithData, styles))
