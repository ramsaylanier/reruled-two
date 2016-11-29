import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './menus.scss'

const MenuItem = (props) => {
  return (
    <li styleName="item">
      {props.children}
    </li>
  )
}

export default CSSModules(MenuItem, styles)
