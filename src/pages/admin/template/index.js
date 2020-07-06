import React from 'react'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import General from './general'
import Body from 'components/admin/body'
import { getChildRoutes } from 'utils/routes'

const Component = {
  General
}

export default function Template() {
  const staffRoutes = getChildRoutes('Template', AdminRouteConfig)
  return (
    <Body
      routes={staffRoutes}
      title='Chủ đề'
      components={Component}
    />
  )
}
