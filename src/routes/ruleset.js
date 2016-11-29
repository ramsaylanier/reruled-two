import React from 'react'
import {Page, PageHeader, PageContent} from 'components/layout/pages'
import NewRuleForm from 'components/rules/newRuleForm'
import DrawerToggleButton from 'components/buttons/drawerToggleButton'
import {List} from 'components/layout/list'
import RuleItem from 'components/rules/ruleItem'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from 'components/rulesets/rulesets.scss'
import gql from 'graphql-tag'
import update from 'react-addons-update'
import {isDuplicateRuleset} from 'components/rulesets/helpers'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
import {groupBy, map} from 'lodash'

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

const ruleSubscription = gql`
  subscription onRuleAdded($rulesetId: String!){
    ruleAdded(rulesetId: $rulesetId){
      id
      type
      description
    }
  }
`

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

@connect(mapStateToProps)
@graphql(rulesetQuery, {
  options: (props) => {
    return ({
      variables: {
        id: props.params.id
      }
    })
  },
  props: ({ data: { loading, ruleset, subscribeToMore } }) => ({
    loading, ruleset, subscribeToMore
  })
})
@CSSModules(styles)

class Ruleset extends React.Component {

  constructor () {
    super()
    this.subscription = null
  }

  componentWillReceiveProps (nextProps) {
    if (!this.subscription && !nextProps.loading) {
      this.subscription = this.props.subscribeToMore({
        document: ruleSubscription,
        variables: { rulesetId: nextProps.params.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          const newRule = subscriptionData.data.ruleAdded
          let newResult
          if (isDuplicateRuleset(newRule, previousResult.ruleset.rules)) {
            return previousResult
          } else {
            if (previousResult.ruleset.rules) {
              newResult = update(previousResult, {
                ruleset: {
                  rules: {
                    $unshift: [newRule]
                  }
                }
              })
            } else {
              newResult = update(previousResult, {
                ruleset: {
                  rules: {
                    $set: [newRule]
                  }
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
    console.log('ruleset: ', this.props)
    const {user, ruleset, loading} = this.props
    const sortRulesByType = (rules) => {
      return groupBy(rules, (rule) => {
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
      const rulesByType = rules && rules.length > 0 && sortRulesByType(rules)
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
                {map(rulesByType, (rules, index) => {
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
}

export default Ruleset
