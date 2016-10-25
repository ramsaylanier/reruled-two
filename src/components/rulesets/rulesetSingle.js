import React from 'react'
import Page from 'components/layout/pages/page'
import NewRulesetButton from 'components/buttons/newRulesetButton'
import CSSModules from 'react-css-modules'
import styles from './rulesets.scss'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'

const RulesetSingle = (props) => {
  const {user, data} = props
  const {ruleset} = data
  console.log(ruleset)
  return (
    <Page>
      <h1>{props.params.title}</h1>

      {ruleset &&
        <div>
          <h1>{ruleset.name}</h1>
          <p>{ruleset.author.username}</p>
        </div>
      }

    </Page>
  )
}

const rulesetQuery = gql`
  query getRuleset($id: String){
    ruleset(id: $id){
      id
      name
      author{
        username
      }
    }
  }
`

const RulesetSingleWithData = graphql(rulesetQuery, {
  options: (props) => {
    return ({
      variables: {
        id: props.params.id
      }
    })
  }
})(RulesetSingle)

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CSSModules(RulesetSingleWithData, styles))
