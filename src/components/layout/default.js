import React from 'react'
import Header from '../header/header'
import MainNav from '../menu/mainNav'

const DefaultLayout = (props) => {
  return (
    <div>
      <Header {...props}/>
      <MainNav />
      {props.children}
    </div>
  )
}

export default DefaultLayout
