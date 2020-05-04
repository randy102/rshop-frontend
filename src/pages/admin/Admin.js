import React from 'react'
import AdminRouteConfig from 'configs/adminRouteConfig'
import Header from 'components/header/Header'
import LeftBar from 'components/leftbar/LeftBar'
import ManageRoute from 'routes/manage-route'
import AdminDropdown from './AdminDropdown'

import 'assets/scss/rui-admin/rui.main.scss'

export default function Admin({match,location}) {
  return (
    <div className="rui-page-wrapper rui-page-admin">
      <Header 
        overlay={AdminDropdown}
        brand="Admin"
      />

      <div className="rui-flex-wrapper">
        <LeftBar 
          match={match}
          location={location}
          routeConfigs={AdminRouteConfig}
          defaultRoute="/user"
        />
          
        <main className="rui-content-wrapper">
          <ManageRoute routeConfigs={AdminRouteConfig} match={match}/>
        </main>
      </div>
    </div>
  )
}
