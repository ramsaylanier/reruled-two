import React from 'react'
import {connect} from 'react-redux'
import MenuToggle from '../menu/menuToggle'
import CSSModules from 'react-css-modules'
import styles from './header.scss'

const Header = (props) => {
  return (
    <header styleName="base">
      <MenuToggle/>
    </header>
  )
}

function mapStateToProps (state) {
  return {user: state.user}
}

export default connect(mapStateToProps)(CSSModules(Header, styles))
