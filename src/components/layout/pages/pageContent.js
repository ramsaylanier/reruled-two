import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './page.scss'

class PageContent extends React.Component {
  render () {
    return (
      <div styleName="content">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(PageContent, styles)
