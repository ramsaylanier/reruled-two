import React from 'react'
import {Page, PageHeader, PageContent} from 'components/layout/pages'
import NewRuleForm from 'components/rules/newRuleForm'
import DrawerToggleButton from 'components/buttons/drawerToggleButton'
import {List, ListItem} from 'components/layout/list'
import RuleItem from 'components/rules/ruleItem'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './rulesets.scss'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
import _ from 'lodash'

const RulesetSingle = (props) => {
  const {user, data} = props
  const {ruleset, loading} = data

  const sortRulesByType = (rules) => {
    return _.groupBy(rules, (rule) => {
      return rule.type
    })
  }

  if (loading) {
    return (
      <div>Loading...</div>
    )
  } else {
    const {game, rules, author} = ruleset
    const canEdit = user.id === ruleset.author.id
    const rulesByType = rules.length > 0 && sortRulesByType(rules)
    return (
      <Page>
        <PageHeader type="tertiary">
          <Link styleName="game" to={`/games/${game.title}`}>{game.title}</Link>
          <h1 styleName="title">{ruleset.name}</h1>
          <p>{author.id}</p>

          {canEdit &&
            <DrawerToggleButton drawerContent={<NewRuleForm rulesetid={ruleset.id}/>}/>
          }
        </PageHeader>

        <PageContent>
          <h3>Rules</h3>
          {rulesByType &&
            <div>
              {_.map(rulesByType, (rules, index) => {
                return (
                  <List type="no-style" key={index}>
                    <h3>{index}</h3>
                    {rules.map(rule => {
                      return (
                        <RuleItem key={rule.id} {...rule}/>
                      )
                    })}
                  </List>
                )
              })}
            </div>
          }
        </PageContent>
      </Page>
    )
  }
}

const rulesetQuery = gql`
  query getRuleset($id: String){
    ruleset(id: $id){
      id
      name
      game{
        title
      }
      author{
        id
        username
      }
      rules{
        id
        type
        description
      }
    }
  }
`

const RulesetSingleWithStyles = CSSModules(RulesetSingle, styles)
const RulesetSingleWithDataAndStyles = graphql(rulesetQuery, {
  options: (props) => {
    return ({
      variables: {
        id: props.params.id
      }
    })
  }
})(RulesetSingleWithStyles)

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(RulesetSingleWithDataAndStyles)
