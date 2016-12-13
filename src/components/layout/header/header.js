import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import MenuToggle from 'components/menu/menuToggle'
import CSSModules from 'react-css-modules'
import styles from './header.scss'
import BackIcon from 'components/icons/backIcon'
import UserAvatar from 'components/profile/userAvatar'
import {TOGGLE_DRAWER, CLOSE_NAV} from 'state/actions/actions'
import TweenMax from 'gsap'

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

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Header extends React.Component {

  static propTypes = {
    drawerOpen: PropTypes.bool.isRequired,
    navOpen: PropTypes.bool.isRequired
  }

  constructor () {
    super()
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
  }

  handleBackButtonClick (e) {
    e.preventDefault()
    if (this.props.drawerOpen || this.props.navOpen) {
      this.props.closeDrawer()
      this.props.closeNav()
    } else {
      this.props.history.goBack()
    }
  }

  renderUserAvatar () {
    return (
      <Link ref={c => { this._avatar = c }} to={`/user/${this.props.user.username}`}><UserAvatar type="small"/></Link>
    )
  }

  shouldComponentUpdate (nextProps) {
    return this.props.user.id !== nextProps.user.id
  }

  componentDidUpdate (nextProps) {
    TweenMax.fromTo(this._avatar, 1, {
      y: -40
    }, {
      y: 0,
      ease: Power4.easeInOut // eslint-disable-line
    })
  }

  render () {
    return (
      <header styleName="base" ref={c => { this._header = c }}>
        <button onClick={this.handleBackButtonClick} styleName="button">
          <BackIcon/>
        </button>

        <div ref={c => { this._avatar = c }}>
          {this.props.user.id && this.renderUserAvatar()}
        </div>

        <MenuToggle/>
      </header>
    )
  }
}

export default Header
