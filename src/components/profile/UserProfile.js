import React from 'react'
import {graphql} from 'react-apollo'
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
        <div className="profile-item">
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
          <div className="profile-item">
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

const UserProfileWithUser = graphql(GetUser, {
  options: (props) => ({
    variables: {
      username: props.params.username,
      loggedIn: true
    }
  })
})(UserProfile)

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserProfileWithUser)
