import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './list.scss'

const List = (props) => {
  return (
    <ul styleName={`base ${props.type}`}>
      {props.children}
    </ul>
  )
}

export default CSSModules(List, styles, {allowMultiple: true})
