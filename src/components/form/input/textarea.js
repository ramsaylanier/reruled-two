import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './input.scss'

class Textarea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
  }

  render () {
    const {type = 'text'} = this.props
    return (
      <textarea
        styleName={`base ${type}`}
        type={type}
        value={this.state.value}
        onChange={this.handleChange}
        {...this.props}
      ></textarea>
    )
  }
}

export default CSSModules(Textarea, styles, {allowMultiple: true})
