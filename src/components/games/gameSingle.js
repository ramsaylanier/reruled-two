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

const GameSingle = (props) => {
  const {user, data} = props
  const {rulesets} = data
  return (
    <Page>
      <PageHeader type="primary">
        <h1>{props.params.title}</h1>
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

export default connect(mapStateToProps, mapDisatchToProps)(CSSModules(GameSingleWithData, styles))
