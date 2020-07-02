import React from 'react'
import { getChildRoutes } from 'utils/routes'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import General from './general'
import Body from 'components/admin/body'

var Component = {
  General
}

export default function Permission() {
  const staffRoutes = getChildRoutes('Permission', AdminRouteConfig)
  return (
    <Body
      routes={staffRoutes}
      title='Quyền'
      components={Component}
    />
  )
}
