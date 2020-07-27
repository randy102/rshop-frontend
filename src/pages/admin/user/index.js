import React from 'react'
import Body from 'components/admin/Body'
import { getChildRoutes } from 'utils/routes'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import General from './general'

const Component = {
  General
}

export default function User() {
  const staffRoutes = getChildRoutes('User', AdminRouteConfig)
  return (
    <Body
      routes={staffRoutes}
      title='Người dùng'
      components={Component}
    />
  )
}
