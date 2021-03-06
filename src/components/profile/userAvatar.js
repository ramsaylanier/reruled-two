import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './profile.scss'

const UserAvatar = (props) => {
  return (
    <div styleName={`avatar ${props.type || 'default'}`}></div>
  )
}

export default CSSModules(UserAvatar, styles, {allowMultiple: true})
