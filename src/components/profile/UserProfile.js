import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const UserProfile = (props) => {
  const {data} = props
  const {loading} = data

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        {props.data.user.username}
      </div>
    )
  }
}

const GetUser = gql`
  query getUser($username: String){
    user(username: $username){
      id
      username
    }
  }
`

const UserProfileWithUser = graphql(GetUser, {
  options: (props) => ({
    variables: {
      username: props.params.username
    }
  })
})(UserProfile)

export default UserProfileWithUser
