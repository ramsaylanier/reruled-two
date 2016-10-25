import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './page.scss'

const PageHeader = (props) => {
  const {type = '', children} = props
  return (
    <div styleName={`header ${type}`}>
      {children}
    </div>
  )
}

export default CSSModules(PageHeader, styles, {allowMultiple: true})
