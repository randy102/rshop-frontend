import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import {AccountBookOutlined} from '@ant-design/icons'
import Subbar from 'components/subbar/Subbar'
import ManageRouteConfig from 'configs/manage-routes'
import InnerContent from 'components/inner-content/InnerContent'

export default function Dashboard({ match, location }) {
  
  return (
    <>
      <Subbar
        defaultRoute="/item1"
        match={match}
        parent="/dashboard"
        routeConfigs={ManageRouteConfig}
        location={location}
      />
      <InnerContent
        match={match}
        parent="/dashboard"
        routeConfigs={ManageRouteConfig}
      />
    </>
  )
}
