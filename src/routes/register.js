import React from 'react'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import {withRouter} from 'react-router'
import Page from 'components/layout/pages/page'
import {Form, FormControl, Label} from 'components/form/form'
import Input from 'components/form/input/input'
import styles from 'components/layout/pages/page.scss'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {throwNotification} from 'state/actions/actions'
import ReruledError from 'error/error'

class Register extends React.Component {

  constructor () {
    super()
    this._handleRegistration = this._handleRegistration.bind(this)
  }

  _validateRegistration = ({username, email, password, confirmPassword}) => {
    if (!username) {
      throw new ReruledError('Enter a username!')
    } else if (!email) {
      throw new ReruledError('Enter an email address')
    } else if (!password) {
      throw new ReruledError('Enter a password')
    } else if (password !== confirmPassword) {
      throw new ReruledError('Passwords do\'nt match')
    }
    return
  }

  _handleRegistration = (e) => {
    e.preventDefault()
    const username = this._username.state.value
    const email = this._email.state.value
    const password = this._password.state.value
    const confirmPassword = this._confirmPassword.state.value
    const registration = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

    try {
      this._validateRegistration(registration)
      this.props.createUser(registration).then(res => {
        this.props.throwNotification({
          message: 'Registration completed!',
          messageType: 'success'
        })
      }).catch(err => {
        this.props.throwNotification({
          message: err.graphQLErrors[0].message,
          messageType: 'error'
        })
      })
    } catch (error) {
      this.props.throwNotification({
        message: error.message,
        messageType: error.type
      })
    }
  }

  render () {
    return (
      <Page>
        <Form action={this._handleRegistration}>
          <FormControl>
            <Label type="block">Username</Label>
            <Input name="username" placeholder="username" ref={c => { this._username = c }}/>
          </FormControl>

          <FormControl>
            <Label type="block">Email</Label>
            <Input name="email" placeholder="email" ref={c => { this._email = c }}/>
          </FormControl>

          <FormControl>
            <Label type="block">Password</Label>
            <Input type="password" ref={c => { this._password = c }}/>
          </FormControl>

          <FormControl>
            <Label type="block">Confirm Password</Label>
            <Input type="password" ref={c => { this._confirmPassword = c }}/>
          </FormControl>

          <FormControl>
            <Input type="submit" value="Register"/>
          </FormControl>
        </Form>
      </Page>
    )
  }
}

const RegisterWithStyles = CSSModules(withRouter(Register), styles)
const createUserMutation = gql`
  mutation createUser($user: UserInput!){
    createUser(user: $user){
      id
      username
    }
  }
`

const RegisterWithMutation = graphql(createUserMutation, {
  props ({ownProps, mutate}) {
    return {
      createUser (user) {
        return mutate({
          variables: {
            user: user
          }
        })
      }
    }
  }
})(RegisterWithStyles)

function mapDispatchToProps (dispatch) {
  return {
    throwNotification: (notification) => {
      dispatch(throwNotification(notification))
    }
  }
}

export default connect(null, mapDispatchToProps)(RegisterWithMutation)
