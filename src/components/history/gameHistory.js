import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {List, ListItem} from 'components/layout/list'

const GameHistory = (props) => {
  const {history} = props
  console.log(history)
  return (
    <List type="no-style">
      {history && history.map(item => {
        return <ListItem><Link to={`games/${item}`}>{item}</Link></ListItem>
      })}
    </List>
  )
}

function mapStateToProps (state) {
  return {
    history: state.user.history
  }
}

export default connect(mapStateToProps)(GameHistory)
