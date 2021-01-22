import React from 'react'
import { getChildRoutes } from 'utils/routes'
import ManageRouteConfig from 'configs/routes/manageRouteConfig'
import Body from 'components/admin/Body'
import General from './general'
import Stock from './stock'

const CONFIG = {
  ROUTE_NAME: 'Store',
  ROUTE_TITLE: 'Kho hàng'
}

const Components = {
  General,
  Stock
}

export default function Store() {
  const dashboardRoutes = getChildRoutes(CONFIG.ROUTE_NAME, ManageRouteConfig)
  return (
    <Body
      title={CONFIG.ROUTE_TITLE}
      routes={dashboardRoutes}
      components={Components}
    />
  )
}
