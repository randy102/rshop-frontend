import React from 'react'
import General from './general'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import { getChildRoutes } from 'utils/routes'
import Body from 'components/admin/body'

const Component = {
  General
}

export default function Contract() {
  const staffRoutes = getChildRoutes('Contract', AdminRouteConfig)
  return (
    <Body
      routes={staffRoutes}
      title='Hợp đồng'
      components={Component}
    />
  )
}
