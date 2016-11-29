import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './input.scss'

@CSSModules(styles, {allowMultiple: true})
class Select extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.options[0].value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
  }

  render () {
    // eslint-disable-next-line no-unused-vars
    const {options, styles, ...rest} = this.props
    return (
      <select
        styleName={'select'}
        value={this.state.value}
        onChange={this.handleChange}
        {...rest}
      >
        {options.map(option => {
          return <option value={option.value} key={option.value}>{option.text}</option>
        })}
      </select>
    )
  }
}

export default Select
