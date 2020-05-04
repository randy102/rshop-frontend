import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { AccountBookOutlined } from '@ant-design/icons'

export default function Subbar({ routeConfigs, parent, defaultRoute, match, location }) {
  return (
    <div className="rui-subbar-wrapper">
      <Redirect to={match.path + defaultRoute} />

      {routeConfigs.filter(route => route.parent === parent).map(route => (
        <div className="rui-subbar-item">
          <Link className={location.pathname.includes(route.path) ? 'active' : ''} to={match.path + route.path}>
            <route.icon />
            {route.name}
          </Link>
        </div>
      ))}
    </div>
  )
}
