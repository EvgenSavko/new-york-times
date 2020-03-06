import React, { forwardRef } from 'react'
import { Drawer as DrawerNative, Text } from 'native-base'
import SideBar from './Sidebar'

const Drawer = forwardRef((props, drawerRef) => {
  const handleCloseDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current._root.close()
    }
  }

  return (
    <DrawerNative ref={drawerRef} content={<SideBar handleCloseDrawer={handleCloseDrawer} />} onClose={handleCloseDrawer}>
      {props.children}
    </DrawerNative>
  )
})

export default Drawer
