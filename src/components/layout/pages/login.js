import React from 'react'
import CSSModules from 'react-css-modules'
import {withRouter} from 'react-router'
import Page from './page'
import {Form, FormControl, Label} from 'components/form/form'
import Input from 'components/form/input/input'
import AUTH_API from 'auth/api'
import {store} from 'apollo'
import styles from './page.scss'

class Login extends React.Component {

  constructor () {
    super()
    this._handleLogin = this._handleLogin.bind(this)
  }

  _handleLogin = (e) => {
    e.preventDefault()
    const username = this._username.state.value
    const password = this._password.state.value
    AUTH_API.login(username, password).then(res => {
      if (res.data.user) {
        store.dispatch({type: 'LOG_IN', user: res.data.user})
        this.props.router.push(`/user/${res.data.user.username}`)
      }
    })
  }

  render () {
    return (
      <Page>
        <Form action={this._handleLogin}>
          <FormControl>
            <Label type="block">Username</Label>
            <Input name="username" placeholder="username" ref={c => { this._username = c }}/>
          </FormControl>

          <FormControl>
            <Label type="block">Password</Label>
            <Input type="password" ref={c => { this._password = c }}/>
          </FormControl>

          <FormControl>
            <Input type="submit" value="Login"/>
          </FormControl>
        </Form>
      </Page>
    )
  }
}

export default CSSModules(withRouter(Login), styles)
