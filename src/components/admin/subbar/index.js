import React from 'react'
import Title from './Title'
import './subbar.scss'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'

export default function SubBar({ title, routes }) {
  const match = useRouteMatch()
  const location = useLocation()
  return (
    <div>
      <Title name={title} />

      <div className="rui-subbar-menu">

        {routes.map(item => {
          const ifActive = location.pathname.includes(match.url + item.path) ? 'active' : ''
          return (
            <div className="rui-subbar-item" key={item.path}>
              <Link className={ifActive} to={match.url + item.path}>
               {item.name}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
