import React from 'react'
import 'assets/scss/rui-admin/rui.main.scss'
import SideBar from 'components/admin/sidebar'
import Container from 'components/admin/container'
import Router from 'components/admin/router'
import AdminRouteConfig from 'configs/adminRouteConfig'
import Staff from './staff'

const Components = {
  Staff
}

export default function Admin() {
  return (
    <div>
      <SideBar routes={AdminRouteConfig} />
      <Container>
        <Router components={Components} routes={AdminRouteConfig} />
      </Container>
    </div>
  )
}
