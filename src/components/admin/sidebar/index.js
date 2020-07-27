import React from 'react'
import * as AntIcon from '@ant-design/icons'
import './sidebar.scss'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import { Tooltip } from 'antd'

export default function SideBar({routes}) {
  const location = useLocation()
  const match = useRouteMatch()

  return (
    <div className='rui-sidebar'>
      {routes.map(item => {
        const Icon = AntIcon[item.icon]
        const ifActive = location.pathname.includes(match.url + item.path) ? 'active' : ''

        return (
          <div key={item.path} className={`rui-sidebar-item ${ifActive}`}>
            <Tooltip placement="right" title={item.name}>
              <Link to={match.url + item.path}>
                <Icon />
              </Link>
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}