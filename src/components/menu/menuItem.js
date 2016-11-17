import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './menus.scss'

class MenuItem extends React.Component {
  render () {
    return (
      <li styleName="item">
        {this.props.children}
      </li>
    )
  }
}

export default CSSModules(MenuItem, styles)
