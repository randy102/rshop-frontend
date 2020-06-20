import React from 'react'
import Body from 'components/admin/body'
import ManageRouteConfig from 'configs/manageRouteConfig'
import General from './general'
import { getChildRoutes } from 'utils/routes'

const Components = {
  General
}

export default function Dashboard() {
  const dashboardRoutes = getChildRoutes('Dashboard', ManageRouteConfig)
  return (
    <Body
      title={"Bảng điều khiển"}
      routes={dashboardRoutes}
      components={Components}
    />
  )
}
