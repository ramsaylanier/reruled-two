import React from 'react'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './Notification.scss'
import TweenMax from 'gsap'

class Notification extends React.Component {

  constructor () {
    super()
    this._hideMessage = this._hideMessage.bind(this)
  }

  componentDidMount () {
    const el = this._container
    if (el) {
      TweenMax.to(this._container, 0.5, {
        y: 0
      })
    }
  }

  componentDidUpdate () {
    const el = this._container
    TweenMax.fromTo(el, 0.5, {
      y: 100
    }, {
      y: 0,
      onComplete: this._hideMessage
    })
  }

  _hideMessage () {
    const el = this._container
    TweenMax.to(el, 0.5, {
      y: 100,
      delay: 3
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
