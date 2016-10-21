import React from 'react'
import CSSModules from 'react-css-modules'
import {withRouter} from 'react-router'
import Page from './Page'
import {Form, FormControl, Label} from 'components/form/form'
import AUTH_API from 'auth/api'
import {store} from 'apollo'
import styles from './page'

class Login extends React.Component {

  _handleLogin = (e) => {
    e.preventDefault()
    const username = this._username.value
    const password = this._password.value
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
        <div styleName="tight-wrapper">
          <Form action={this._handleLogin}>
            <FormControl>
              <Label type="block">Username</Label>
              <input type="text" name="username" placeholder="username" ref={ (c) => this._username = c}/>
            </FormControl>

            <FormControl>
              <Label type="block">Password</Label>
              <input type="password" ref={(c) => this._password = c}/>
            </FormControl>

            <FormControl>
              <input type="submit" value="login"/>
            </FormControl>
          </Form>
        </div>
      </Page>
    )
  }
}

export default CSSModules(withRouter(Login), styles)
