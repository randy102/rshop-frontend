import React from 'react'
import { getChildRoutes } from 'utils/routes'
import AdminRouteConfig from 'configs/routes/adminRouteConfig'
import Body from 'components/admin/body'
import Profile from './profile'

var Component = {
  Profile
}

export default function Account() {
  const staffRoutes = getChildRoutes('Account', AdminRouteConfig)
  return (
    <Body
      routes={staffRoutes}
      title='Tài khoản'
      components={Component}
    />
  )
}
