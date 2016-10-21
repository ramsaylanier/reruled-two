import React from 'react'
import NewRulesetForm from 'components/rulesets/newRulesetForm'
import CSSModules from 'react-css-modules'
import styles from './button.scss'
import {connect} from 'react-redux'
import {TOGGLE_DRAWER} from 'state/actions/actions'

const NewRulesetButton = (props) => {
  return (
    <button styleName='primary' onClick={ () => props.loadNewRulesetForm()}>Create New Ruleset</button>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadNewRulesetForm: () => {
      dispatch({
        type: TOGGLE_DRAWER,
        isOpen: true,
        content: <NewRulesetForm/>
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(NewRulesetButton, styles))
