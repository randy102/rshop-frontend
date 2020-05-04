import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import List from 'components/list/List'


export default function LeftBar({ defaultRoute ,match, location, routeConfigs }) {
  return (
    <nav className="rui-leftbar-wrapper">
      <Redirect to={match.path + defaultRoute} />
          <List>
            {routeConfigs.map(route => route.parent === undefined && (
              <li>
                <Link className={location.pathname.includes(route.path) ? 'active' : ''} to={match.path + route.path}>
                  <route.icon />
                  {route.name}
                </Link>
              </li>
            ))}
          </List>
    </nav>
  )
}
