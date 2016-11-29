import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './page.scss'

const PageContent = (props) => {
  return (
    <div styleName="content">
      {props.children}
    </div>
  )
}

export default CSSModules(PageContent, styles)
