import React from 'react'
import SideBar from 'components/admin/sidebar'
import Container from 'components/admin/container'
import ManageRouteConfig from 'configs/routes/manageRouteConfig'
import 'assets/scss/rui-admin/rui.main.scss'
import Dashboard from './dashboard'
import Router from 'components/admin/router'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACTIVE_CONTRACT } from './queries'
import { Redirect } from 'react-router-dom'

const Components = {
  Dashboard
}

export default function Manage() {
  const {data} = useQuery(GET_ACTIVE_CONTRACT)
  
  if(data && !data.activeContract._id){
    return <Redirect to="/contract"/>
  }

  return (
    <div>
      <SideBar routes={ManageRouteConfig}/>
      <Container>
        <Router components={Components} routes={ManageRouteConfig}/>
      </Container>
    </div>
  )
}
