import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import MenuToggle from 'components/menu/menuToggle'
import CSSModules from 'react-css-modules'
import styles from './header.scss'
import BackIcon from 'components/icons/backIcon'
import UserAvatar from 'components/profile/userAvatar'
import {TOGGLE_DRAWER, CLOSE_NAV} from 'state/actions/actions'

const Header = (props) => {
  const handleBackButtonClick = (e) => {
    e.preventDefault()
    if (props.drawerOpen || props.navOpen) {
      props.closeDrawer()
      props.closeNav()
    } else {
      props.history.goBack()
    }
  }

  return (
    <header styleName="base">
      <button onClick={handleBackButtonClick} styleName="button">
        <BackIcon/>
      </button>

      {props.user.id && <Link to={`/user/${props.user.username}`}><UserAvatar type="small"/></Link>}

      <MenuToggle/>
    </header>
  )
}

Header.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  navOpen: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    user: state.user,
    drawerOpen: state.ui.drawerOpen,
    navOpen: state.ui.navOpen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeNav: () => {
      dispatch({type: CLOSE_NAV})
    },
    closeDrawer: () => {
      dispatch({
        type: TOGGLE_DRAWER,
        isOpen: false
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Header, styles))
