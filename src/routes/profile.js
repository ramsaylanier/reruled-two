import React from 'react'
import {graphql} from 'react-apollo'
import CSSModules from 'react-css-modules'
import styles from 'components/profile/profile.scss'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {Page, PageContent} from 'components/layout/pages'
import UserAvatar from 'components/profile/userAvatar'
import {FormControl, Label} from 'components/form/form'
import Input from 'components/form/input/input'

const userQuery = gql`
  query getUser($username: String, $currentUser: String){
    user(username: $username, currentUser: $currentUser){
      id
      username
      email
    }
  }
`

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

@connect(mapStateToProps)
@graphql(userQuery, {
  options: (props) => ({
    variables: {
      username: props.params.username,
      currentUser: props.user.username
    }
  })
})
@CSSModules(styles)
class UserProfile extends React.Component {

  _showUerEmail ({email}) {
    if (email) {
      return (
        <FormControl>
          <Label type="block">Email</Label>
          <Input type="text" value={email} disabled="disabled"/>
        </FormControl>
      )
    }
  }

  render () {
    const {data} = this.props
    const {loading, user} = data

    if (loading) {
      return <div>Loading...</div>
    } else {
      const {username} = user
      return (
        <Page>
          <PageContent>
            <UserAvatar/>
            <FormControl>
              <Label type="block">Username</Label>
              <Input type="text" value={username} disabled="disabled"/>
            </FormControl>
            {this._showUserEmail(user)}
          </PageContent>
        </Page>
      )
    }
  }
}

export default UserProfile
