import React from 'react'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './Notification.scss'
import TweenMax from 'gsap'

class Notification extends React.Component {

  constructor () {
    super()
    this._hideMessage = this._hideMessage.bind(this)
    this._animateContainer = this._animateContainer.bind(this)
  }

  _hideMessage () {
    this._animateContainer({y: 100, delay: 3})
  }

  _animateContainer (animationProps) {
    const container = this._container
    if (container) {
      TweenMax.to(container, 0.5, animationProps)
    }
  }

  componentDidMount () {
    this._animateContainer({y: 0})
  }

  componentDidUpdate () {
    const container = this._container
    if (container) {}
    TweenMax.fromTo(container, 0.5, {
      y: 100
    }, {
      y: 0,
      onComplete: this._hideMessage
    })
  }

  render () {
    const {notification} = this.props
    if (notification) {
      const {message, messageType = ''} = this.props.notification
      return (
        <div ref={c => { this._container = c }} styleName={`container ${messageType}`}>
          <p styleName="text">{message}</p>
        </div>
      )
    } else {
      return (
        <div>
          <p styleName="text"></p>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    notification: state.ui.notification
  }
}

export default connect(mapStateToProps)(CSSModules(Notification, styles, {allowMultiple: true}))
