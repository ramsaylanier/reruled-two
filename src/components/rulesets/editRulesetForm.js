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
import {throwNotification, toggleDrawer} from 'state/actions/actions'
import {shapeRuleset} from './helpers'
import {findIndex} from 'lodash'

function mapStateToProps (state) {
  return {
    user: state.user,
    currentGame: state.game.currentGame
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeDrawer: () => {
      dispatch(toggleDrawer(false))
    },
    throwNotification: (notification) => {
      dispatch(throwNotification(notification))
    }
  }
}

const editRulesetMutation = gql`
  mutation updateRuleset($ruleset: RulesetInput!){
    updateRuleset(ruleset: $ruleset){
      id
      name
      author{
        id
      }
      rules{
        id
        type
      }
    }
  }
`

@connect(mapStateToProps, mapDispatchToProps)
@graphql(editRulesetMutation, {
  props ({ownProps, mutate}) {
    return {
      updateRuleset (ruleset) {
        return mutate({
          variables: {
            ruleset: ruleset
          },
          updateQueries: {
            getRulesetsForGame: (prev, { mutationResult }) => {
              const updatedRuleset = mutationResult.data.updateRuleset
              return update(prev, {
                rulesets: {
                  $apply: rulesets => {
                    const index = findIndex(rulesets, ruleset => {
                      return ruleset.id === updatedRuleset.id
                    })
                    rulesets[index] = updatedRuleset
                  }
                }
              })
            }
          }
        })
      }
    }
  }
})
@CSSModules(styles)
class EditRulesetForm extends React.Component {

  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const rulesetName = this._rulesetName.state.value

    if (!rulesetName || rulesetName.length < 1) {
      this.props.throwNotification({
        message: 'You must give your ruleset a name.',
        messageType: 'error'
      })
    } else {
      const ruleset = shapeRuleset(this.props.ruleset)
      ruleset.name = this._rulesetName.state.value
      ruleset.game = this.props.currentGame

      this.props.updateRuleset(ruleset).then(res => {
        this._rulesetName.value = ''
        this.props.closeDrawer()
        this.props.throwNotification({
          message: 'Ruleset updated!',
          messageType: 'success'
        })
      }).catch(err => {
        this.props.throwNotification({
          message: err.message,
          messageType: 'error'
        })
      })
    }
  }

  render () {
    return (
      <Form action={this.handleSubmit}>
        <FormControl>
          <Label type="block">Ruleset Name</Label>
          <Input name="ruleset name" startValue={this.props.ruleset.name} ref={c => { this._rulesetName = c }}/>
        </FormControl>

        <FormControl>
          <Input type="submit" value="Save"/>
        </FormControl>
      </Form>
    )
  }
}

export default withRouter(EditRulesetForm)
