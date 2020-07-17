import React from 'react'
import SideBar from 'components/admin/sidebar'
import Container from 'components/admin/container'
import ManageRouteConfig from 'configs/routes/manageRouteConfig'
import 'assets/scss/rui-admin/rui.main.scss'
import Dashboard from './dashboard'
import Router from 'components/admin/router'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACTIVE_CONTRACT_AND_USER_SHOPS } from './queries'
import { Redirect } from 'react-router-dom'
import ShopHeader from 'components/admin/shop-header'
import Shop from './shop'

const Components = {
  Dashboard,
  Shop
}

export default function Manage() {
  const { data } = useQuery(GET_ACTIVE_CONTRACT_AND_USER_SHOPS)

  if (data) {
    // If not have contract or expired
    if(!data.activeContract._id)
      return <Redirect to="/contract" />

  }

  return (
    <div>
      <SideBar routes={ManageRouteConfig} />
      <ShopHeader />
      <Container style={{paddingTop: 80}}>
        <Router components={Components} routes={ManageRouteConfig} />
      </Container>
    </div>
  )
}
