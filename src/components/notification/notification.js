import React from 'react'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './Notification.scss'

class Notification extends React.Component {
  render () {
    const {notification} = this.props
    if (notification) {
      const {message, messageType = ''} = this.props.notification
      return (
        <div styleName={`container ${messageType}`}>
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
