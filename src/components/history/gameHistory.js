import React from 'react'
import {Link} from 'react-router'
import {List, ListItem} from 'components/layout/list'

const GameHistory = (props) => {
  const {history} = props
  return (
    <List type="no-style">
      {history && history.map(item => {
        return <ListItem key={item}><Link to={`games/${item}`}>{item}</Link></ListItem>
      })}
    </List>
  )
}

export default GameHistory
