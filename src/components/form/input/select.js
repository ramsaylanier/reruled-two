import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './input.scss'

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
    const {type = 'text', options} = this.props
    return (
      <select
        styleName={`base ${type}`}
        type={type}
        value={this.state.value}
        onChange={this.handleChange}
        {...this.props}
      >
        {options.map(option => {
          return <option value={option.value}>{option.text}</option>
        })}
      </select>
    )
  }
}

export default CSSModules(Select, styles, {allowMultiple: true})
