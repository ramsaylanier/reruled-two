import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './list.scss'

const ListItem = (props) => {
  return (
    <li styleName="item">
      {props.children}
    </li>
  )
}

export default CSSModules(ListItem, styles)
