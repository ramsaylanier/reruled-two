import React from 'react'
import {Page, PageHeader, PageContent} from 'components/layout/pages'
import NewRuleForm from 'components/rules/newRuleForm'
import DrawerToggleButton from 'components/buttons/drawerToggleButton'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './rulesets.scss'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'

const RulesetSingle = (props) => {
  const {user, data} = props
  const {ruleset, loading} = data

  if (loading) {
    return (
      <div>Loading...</div>
    )
  } else {
    const {game} = ruleset
    const canEdit = user.id === ruleset.author.id
    return (
      <Page>
        <PageHeader type="tertiary">
          <Link styleName="game" to={`/games/${game.title}`}>{game.title}</Link>
          <h1 styleName="title">{ruleset.name}</h1>

          {canEdit &&
            <DrawerToggleButton drawerContent={<NewRuleForm/>}/>
          }
        </PageHeader>

        <PageContent>
          <h3>Rules</h3>
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
