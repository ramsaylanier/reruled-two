import React from 'react'
import update from 'react-addons-update'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import {withRouter} from 'react-router'
import {Form, FormControl, Label} from 'components/form/form'
import Input from 'components/form/input/input'
import styles from './rulesets.scss'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {throwNotification} from 'state/actions/actions'

class NewRulesetForm extends React.Component {

  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const ruleset = {
      author: this.props.user,
      name: this._rulesetName.state.value,
      game: this.props.currentGame
    }

    this.props.createNewRuleset(ruleset).then(res => {
      this.props.throwNotification({
        message: 'Ruleset created!',
        messageType: 'success'
      })
    }).catch(err => {
      this.props.throwNotification({
        message: err.message,
        messageType: 'error'
      })
    })
  }

  render () {
    return (
      <Form action={this.handleSubmit}>
        <FormControl>
          <Label type="block">Ruleset Name</Label>
          <Input name="ruleset name" placeholder="ruleset name" ref={c => { this._rulesetName = c }}/>
        </FormControl>

        <FormControl>
          <Input type="submit" value="Create"/>
        </FormControl>
      </Form>
    )
  }
}

const createRulesetMutation = gql`
  mutation createRuleset($ruleset: RulesetInput!){
    createRuleset(ruleset: $ruleset){
      id
      name
    }
  }
`
const NewRulesetFormWithMutation = graphql(createRulesetMutation, {
  props ({ownProps, mutate}) {
    return {
      createNewRuleset (ruleset) {
        return mutate({
          variables: {
            ruleset: ruleset
          },
          updateQueries: {
            getRulesetsForGame: (prev, { mutationResult }) => {
              const newRuleset = mutationResult.data.createRuleset
              return update(prev, {
                rulesets: {
                  $unshift: [newRuleset]
                }
              })
            }
          }
        })
      }
    }
  }
})(NewRulesetForm)

function mapStateToProps (state) {
  return {
    user: state.user,
    currentGame: state.game.currentGame
  }
}

function mapDispatchToProps (dispatch) {
  return {
    throwNotification: (notification) => {
      dispatch(throwNotification(notification))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(withRouter(NewRulesetFormWithMutation), styles))
