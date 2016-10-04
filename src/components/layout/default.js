import React from 'react'
import Header from '../header/header'
import '../../styles/global.scss'
import {AppContainer} from 'react-hot-loader'

const DefaultLayout = (props) => {
  return (
    <div>
      <Header/>
      {props.children}
    </div>
  )
}

export default DefaultLayout
