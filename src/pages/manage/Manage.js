import React from 'react'
import ManageRouteConfig from 'configs/manage-routes'

import Header from 'components/header/Header'
import LeftBar from 'components/leftbar/LeftBar'
import ManageRoute from 'routes/manage-route'
import ManageDropdown from './ManageDropdown'


import 'assets/scss/rui-admin/rui.main.scss'

export default function Manage({match,location}) {
  return (
    <div className="rui-page-wrapper rui-page-admin">
      <Header 
        overlay={ManageDropdown}
        brand="Manage"
      />

      <div className="rui-flex-wrapper">
        <LeftBar 
          match={match}
          location={location}
          routeConfigs={ManageRouteConfig}
          defaultRoute="/dashboard"
        />
          
        <main className="rui-content-wrapper">
          <ManageRoute match={match}/>
        </main>
      </div>
    </div>
  )
}
