import React from 'react'
import './admin.scss'
import SideBar from 'components/admin/SideBar'
import Container from 'components/admin/Container'
import Router from 'components/admin/Router'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import User from './user'
import Account from './account'
import Permission from './permission'
import Plan from './plan'
import Contract from './contract'
import Template from './template'

const Components = {
  User,
  Account,
  Permission,
  Plan,
  Contract,
  Template
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
