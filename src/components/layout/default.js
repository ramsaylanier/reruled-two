import React from 'react'
import Header from '../header/header'
import '../../styles/global.scss'

const DefaultLayout = (props) => {
  return (
    <div>
      <Header/>
      {props.children}
    </div>
  )
}

export default DefaultLayout
