import React from 'react'
import Header from 'components/header/header'
import Drawer from 'components/layout/drawer/drawer'
import MainNav from 'components/menu/mainNav'

const DefaultLayout = (props) => {
  return (
    <div>
      <Header {...props}/>
      <MainNav />
      <Drawer side="right"/><Drawer/>
      {props.children}
    </div>
  )
}

export default DefaultLayout
