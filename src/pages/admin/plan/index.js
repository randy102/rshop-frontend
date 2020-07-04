import React from 'react'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import General from './general'
import Body from 'components/admin/body'
import { getChildRoutes } from 'utils/routes'

var Component = {
  General
}

export default function Plan() {
  const staffRoutes = getChildRoutes('Plan', AdminRouteConfig)
  return (
    <Body
      routes={staffRoutes}
      title='Gói sử dụng'
      components={Component}
    />
  )
}