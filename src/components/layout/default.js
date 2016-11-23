import React from 'react'
import Header from 'components/layout/header/header'
import Drawer from 'components/layout/drawer/drawer'
import MainNav from 'components/menu/mainNav'
import Notification from 'components/notification/notification'

const DefaultLayout = (props) => {
  return (
    <div>
      <Header {...props}/>
      <MainNav />
      <Drawer side="right"/>
        {props.children}
      <Notification/>
    </div>
  )
}

export default DefaultLayout
