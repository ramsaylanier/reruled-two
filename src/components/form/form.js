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

const label = (props) => {
  const {type = ''} = props
  return (
    <label styleName={`label ${type}`}>
      {props.children}
    </label>
  )
}

const Form = CSSModules(form, styles)
const FormControl = CSSModules(formControl, styles)
const Label = CSSModules(label, styles, {allowMultiple: true})

export {Form, FormControl, Label}
