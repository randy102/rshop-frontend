import React from 'react'
import 'assets/scss/rui-admin/rui.main.scss'
import SideBar from 'components/admin/sidebar'
import Container from 'components/admin/container'
import Router from 'components/admin/router'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import User from './user'
import Account from './account'
import Permission from './permission'

const Components = {
  User,
  Account,
  Permission
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
