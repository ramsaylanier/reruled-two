import React from 'react'
import Page from 'components/layout/pages/page'
import NewRulesetButton from 'components/buttons/newRulesetButton'
import CSSModules from 'react-css-modules'
import styles from './game.scss'
import {connect} from 'react-redux'

const GameSingle = (props) => {
  const {user} = props
  return (
    <Page>
      <h1 styleName="title">{props.params.title}</h1>

      {user.id &&
        <NewRulesetButton/>
      }
    </Page>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CSSModules(GameSingle, styles))
