import React from 'react'
import SideBar from 'components/admin/sidebar'
import Content from 'components/admin/content'

import 'assets/scss/rui-admin/rui.main.scss'

export default function Manage({match,location}) {
  return (
    <div>
      <SideBar/>
      <Content/>
    </div>
  )
}
