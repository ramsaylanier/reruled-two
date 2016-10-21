import React from 'react'
import CSSModules from 'react-css-modules'
import {withRouter} from 'react-router'
import {Form, FormControl, Label} from 'components/form/form'
import Input from 'components/form/input/input'
import styles from './rulesets.scss'

class NewRulesetForm extends React.Component {

  constructor () {
    super()
    this._createNewRuleset = this._createNewRuleset.bind(this)
  }

  _createNewRuleset = (e) => {
    e.preventDefault()
    const username = this._username.state.value
    const password = this._password.state.value
  }

  render () {
    return (
      <Form action={this._handleLogin}>
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

export default CSSModules(withRouter(NewRulesetForm), styles)
