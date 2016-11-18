import React from 'react'
import {graphql} from 'react-apollo'
import CSSModules from 'react-css-modules'
import styles from './profile.scss'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {Page, PageContent} from 'components/layout/pages'
import UserAvatar from 'components/profile/userAvatar'
import {FormControl, Label} from 'components/form/form'
import Input from 'components/form/input/input'

const UserProfile = (props) => {
  const {data} = props
  const {loading, user} = data

  function showUserEmail ({email}) {
    if (email) {
      return (
        <FormControl>
          <Label type="block">Email</Label>
          <Input type="text" value={email} disabled="disabled"/>
        </FormControl>
      )
    }
    return
  }

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
          {showUserEmail(user)}
        </PageContent>
      </Page>
    )
  }
}

const GetUser = gql`
  query getUser($username: String, $currentUser: String){
    user(username: $username, currentUser: $currentUser){
      id
      username
      email
    }
  }
`

const UserProfileWithStyles = CSSModules(UserProfile, styles)

const UserProfileWithUser = graphql(GetUser, {
  options: (props) => ({
    variables: {
      username: props.params.username,
      currentUser: props.user.username
    }
  })
})(UserProfileWithStyles)

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserProfileWithUser)
