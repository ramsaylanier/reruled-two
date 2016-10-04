import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './header.scss'
import {Link} from 'react-router'

const Header = (props) => {
  return (
    <header styleName="base">
      <ul>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </ul>
    </header>
  )
}

export default CSSModules(Header, styles)
