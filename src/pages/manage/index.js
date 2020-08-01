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
import Staff from './staff'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { GET_CURRENT_ROLE } from './queries'
import { useQuery } from '@apollo/react-hooks'

const Components = {
  Dashboard,
  Shop,
  Account,
  Staff
}

export default function Manage() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)
  const { data, loading } = useQuery(GET_CURRENT_ROLE, { variables: { idShop: currentShop?._id } })
  console.log(data)
  return (
    <MiddleWare.Contract>
      <MiddleWare.Domain>
        <SideBar routes={ManageRouteConfig} />
        <ShopHeader />
        <Container style={{ paddingTop: 80 }}>
          <MiddleWare.Shop>
            <Router
              components={Components}
              routes={ManageRouteConfig}
              isMaster={data?.currentRole?.isMaster}
              permissions={data?.currentRole?.permissions.map(p => p.name)}
              loading={loading}
            />
          </MiddleWare.Shop>
        </Container>
      </MiddleWare.Domain>
    </MiddleWare.Contract>
  )
}
