import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './button.scss'
import {connect} from 'react-redux'
import {TOGGLE_DRAWER} from 'state/actions/actions'
import {TweenMax, Power4} from 'gsap'

function mapStateToProps (state) {
  return {
    user: state.user,
    drawerOpen: state.ui.drawerOpen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleDrawer: (drawerContent, drawerOpen) => {
      const shouldDrawerBeOpen = !drawerOpen
      dispatch({
        type: TOGGLE_DRAWER,
        isOpen: shouldDrawerBeOpen,
        content: drawerContent
      })
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class drawerToggleButton extends React.Component {

  componentWillReceiveProps (nextProps) {
    const {drawerOpen} = nextProps
    const rotation = drawerOpen ? 45 : 0
    TweenMax.to(this._toggle, 0.5, {
      rotation: `${rotation}deg`,
      ease: Power4.easeInOut
    })
  }

  render () {
    const {toggleDrawer, drawerContent, drawerOpen} = this.props
    return (
      <button
        ref={c => { this._toggle = c }}
        styleName={`${this.props.type || 'fixed'}`}
        onClick={ () => toggleDrawer(drawerContent, drawerOpen)}
      >
        {this.props.icon || '+'}
      </button>
    )
  }
}

export default drawerToggleButton
