import React from 'react'
import SideBar from 'components/admin/SideBar'
import Container from 'components/admin/Container'
import ManageRouteConfig from 'configs/routes/manageRouteConfig'
import './manage.scss'
import Dashboard from './dashboard'
import Router from 'components/admin/Router'
import ShopHeader from 'components/admin/ShopHeader'
import Shop from './shop'
import { MiddleWare } from './middlewares'
import Account from './account'

const Components = {
  Dashboard,
  Shop,
  Account
}

export default function Manage() {

  return (
    <MiddleWare.Contract>
      <MiddleWare.Shop>
        <SideBar routes={ManageRouteConfig} />
        <ShopHeader />
        <Container style={{ paddingTop: 80 }}>
          <Router components={Components} routes={ManageRouteConfig} />
        </Container>
      </MiddleWare.Shop>
    </MiddleWare.Contract>
  )
}
