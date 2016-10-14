import React from 'react'
import {Form, FormControl} from './form/form'
import CSSModules from 'react-css-modules'
import formStyles from './form/form.scss'
import inputStyles from './form/input.scss'
import _ from 'lodash'
import AUTH_API from '../auth/api'

const styles = _.merge(formStyles, inputStyles)

class Login extends React.Component {

  _handleLogin = (e) => {
    e.preventDefault()
    const username = this._username.value
    const password = this._password.value
    AUTH_API.login(username, password)
  }

  render () {
    return (
      <Form action={this._handleLogin}>
        <FormControl>
          <label styleName="label">Username</label>
          <input type="text" name="username" placeholder="username" ref={(c) => this._username = c}/>
        </FormControl>

        <FormControl>
          <label styleName="label">Password</label>
          <input type="password" ref={(c) => this._password = c}/>
        </FormControl>

        <FormControl>
          <input type="submit" value="login"/>
        </FormControl>
      </Form>
    )
  }
}

export default CSSModules(Login, styles)
