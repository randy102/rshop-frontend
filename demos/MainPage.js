import React from 'react'
import { getChildRoutes } from 'utils/routes'
import ManageRouteConfig from 'configs/routes/manageRouteConfig'
import Body from 'components/admin/Body'
import General from './general'

const CONFIG = {
  ROUTE_NAME: '',
  ROUTE_TITLE: ''
}

const Components = {
  General,
}

export default function Product() {
  const dashboardRoutes = getChildRoutes(CONFIG.ROUTE_NAME, ManageRouteConfig)
  return (
    <Body
      title={CONFIG.ROUTE_TITLE}
      routes={dashboardRoutes}
      components={Components}
    />
  )
}
