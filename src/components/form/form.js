import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './form.scss'

const form = (props) => {
  return (
    <form styleName="base" onSubmit={props.action}>
      {props.children}
    </form>
  )
}

const formControl = (props) => {
  return (
    <div styleName="control">
      {props.children}
    </div>
  )
}

const Form = CSSModules(form, styles)
const FormControl = CSSModules(formControl, styles)

export {Form, FormControl}
