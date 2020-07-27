import React from 'react'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import General from './general'
import Body from 'components/admin/Body'
import { getChildRoutes } from 'utils/routes'

const Component = {
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
