import React from 'react'
import CSSModules from 'react-css-modules'
import {connect} from 'react-redux'
import styles from './drawer.scss'
import TweenMax from 'gsap'
import {TOGGLE_DRAWER} from 'state/actions/actions'
class Drawer extends React.Component {
  componentWillReceiveProps (nextProps) {
    let dX = '0%'
    if (nextProps.ui.drawerOpen) {
      dX = '-100%'
    }
    TweenMax.to(this._drawer, 0.75, {
      x: dX,
      ease: Power4.easeOut
    })
  }

  render () {
    const drawerClass = 'base'
    return (
      <div styleName={drawerClass} ref={ c => { this._drawer = c }}>
        <button onClick={ () => this.props.toggleDrawer()}>X</button>
        {this.props.ui.drawerContent}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    ui: state.ui
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleDrawer: () => {
      dispatch({
        type: TOGGLE_DRAWER,
        isOpen: false
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Drawer, styles, {allowMultiple: true}))
