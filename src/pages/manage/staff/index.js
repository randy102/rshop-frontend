import React from 'react'
import { getChildRoutes } from 'utils/routes'
import ManageRouteConfig from 'configs/routes/manageRouteConfig'
import Body from 'components/admin/Body'
import General from './general'

const Components = {
  General
}

export default function Staff() {
  const dashboardRoutes = getChildRoutes('Staff', ManageRouteConfig)
  return (
    <Body
      title={"Thành viên"}
      routes={dashboardRoutes}
      components={Components}
    />
  )
}
