import React from 'react'
import {connect} from 'react-redux'
import MenuToggle from '../menu/menuToggle'
import CSSModules from 'react-css-modules'
import styles from './header.scss'
import BackIcon from 'components/icons/backIcon'

const Header = (props) => {
  const handleBackButtonClick = (e) => {
    e.preventDefault()
    console.log(props)
    props.history.goBack()
  }

  return (
    <header styleName="base">
      <button onClick={handleBackButtonClick} styleName="button">
        <BackIcon/>
      </button>
      <MenuToggle/>
    </header>
  )
}

function mapStateToProps (state) {
  return {user: state.user}
}

export default connect(mapStateToProps)(CSSModules(Header, styles))
