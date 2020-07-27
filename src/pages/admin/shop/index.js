import React from 'react'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import General from './general'
import Body from 'components/admin/Body'
import { getChildRoutes } from 'utils/routes'
import List from './list'

const Component = {
  General,
  List
}

export default function Shop() {
  const staffRoutes = getChildRoutes('Shop', AdminRouteConfig)
  return (
    <Body
      routes={staffRoutes}
      title='Cửa hàng'
      components={Component}
    />
  )
}
