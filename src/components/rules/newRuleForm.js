import React from 'react'
import update from 'react-addons-update'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import {withRouter} from 'react-router'
import {Form, FormControl, Label} from 'components/form/form'
import Select from 'components/form/input/select'
import Textarea from 'components/form/input/textarea'
import Input from 'components/form/input/input'
import styles from './rules.scss'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {throwNotification, toggleDrawer} from 'state/actions/actions'
import {pick} from 'lodash'
import {isDuplicateRuleset} from 'components/rulesets/helpers'

const typeOptions = [
  {value: 'setup', text: 'Setup'},
  {value: 'play', text: 'Play'},
  {value: 'endgame', text: 'Endgame'},
  {value: 'misc', text: 'Miscellaneous'}
]

const createRuleMutation = gql`
  mutation createRule($rule: RuleInput!){
    createRule(rule: $rule){
      id
      description
      type
    }
  }
`

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
    },
    closeDrawer: () => {
      dispatch(toggleDrawer(false))
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@graphql(createRuleMutation, {
  props ({ownProps, mutate}) {
    return {
      createNewRule (rule) {
        return mutate({
          variables: {
            rule: rule
          },
          updateQueries: {
            getRuleset: (previousResult, { mutationResult }) => {
              const newRule = mutationResult.data.createRule
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
            }
          }
        })
      }
    }
  }
})
@CSSModules(styles)
class NewRuleForm extends React.Component {

  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const author = pick(this.props.user, ['id', 'username'])
    const rule = {
      type: this._ruleType.state.value,
      description: this._ruleDescription.state.value,
      ruleset: this.props.rulesetid,
      author: author
    }

    this.props.createNewRule(rule).then(res => {
      this.props.throwNotification({
        message: 'Rule created!',
        messageType: 'success'
      })
      this.props.closeDrawer()
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
          <Label type="block">Rule Type</Label>
          <Select options={typeOptions} ref={c => { this._ruleType = c }}/>
        </FormControl>

        <FormControl>
          <Label type="block">Rule Description</Label>
          <Textarea ref={c => { this._ruleDescription = c }}/>
        </FormControl>

        <FormControl>
          <Input type="submit" value="Create"/>
        </FormControl>
      </Form>
    )
  }
}

export default withRouter(NewRuleForm)
