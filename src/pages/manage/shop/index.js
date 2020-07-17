import React from 'react'
import { getChildRoutes } from 'utils/routes'
import ManageRouteConfig from 'configs/routes/manageRouteConfig'
import Body from 'components/admin/body'
import Create from './create'

const Components = {
  Create
}

export default function Shop() {
  const dashboardRoutes = getChildRoutes('Shop', ManageRouteConfig)
  return (
    <Body
      title={"Cửa hàng"}
      routes={dashboardRoutes}
      components={Components}
    />
  )
}
