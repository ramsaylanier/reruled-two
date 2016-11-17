import React from 'react'
import {graphql} from 'react-apollo'
import CSSModules from 'react-css-modules'
import styles from './profile.scss'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {Page, PageContent} from 'components/layout/pages'
import UserAvatar from 'components/profile/userAvatar'

const UserProfile = (props) => {
  const {data} = props
  const {loading, user} = data

  function showUserEmail ({email}) {
    if (email) {
      return (
        <div styleName="profile-item">
          <label>
            e-mail
          </label>
          <input value={email} disabled="disabled"></input>
        </div>
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
          <div styleName="profile-item">
            <label>
              username
            </label>
            <input value={username} disabled="disabled"></input>
          </div>
          {showUserEmail(user)}
        </PageContent>
      </Page>
    )
  }
}

const GetUser = gql`
  query getUser($username: String, $loggedIn: Boolean){
    user(username: $username, loggedIn: $loggedIn){
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
      loggedIn: true
    }
  })
})(UserProfileWithStyles)

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserProfileWithUser)
