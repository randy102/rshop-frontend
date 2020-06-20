import React from 'react'
import Body from 'components/admin/body'
import { getChildRoutes } from 'utils/routes'
import AdminRouteConfig from 'configs/adminRouteConfig'
import General from './general'

const Component = {
  General
}

export default function Staff() {
  const staffRoutes = getChildRoutes('Staff', AdminRouteConfig)
  return (
    <Body
      routes={staffRoutes}
      title='Quản trị viên'
      components={Component}
    />
  )
}
