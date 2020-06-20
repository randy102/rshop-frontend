import React from 'react'
import SideBar from 'components/admin/sidebar'
import Container from 'components/admin/container'
import ManageRouteConfig from 'configs/manageRouteConfig'
import 'assets/scss/rui-admin/rui.main.scss'
import Dashboard from './dashboard'
import Router from 'components/admin/router'

const Components = {
  Dashboard
}

export default function Manage() {
  return (
    <div>
      <SideBar routes={ManageRouteConfig}/>
      <Container>
        <Router components={Components} routes={ManageRouteConfig}/>
      </Container>
    </div>
  )
}
