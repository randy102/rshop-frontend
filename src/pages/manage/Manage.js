import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import ManageRouteConfig from 'configs/manage-routes'
import Header from 'components/header/Header'
import Brand from 'components/header/Brand'
import List from 'components/list/List'
import LeftBar from 'components/leftbar/LeftBar'
import ManageRoute from 'routes/manage-route'
import ManageDropdown from './ManageDropdown'


export default function Manage({match,location}) {

  return (
    <div className="rui-page-wrapper rui-page-admin">
      <Header>
        <Brand>
          Manage
        </Brand>

        <div className="rui-float-right">
          <Dropdown overlay={ManageDropdown} placement="bottomCenter">
            <Button>User <DownOutlined /></Button>
          </Dropdown>
        </div>
      </Header>

      <div className="rui-flex-wrapper">
        <LeftBar>
          <List>
            {ManageRouteConfig.map(route => (
              <li>
                <Link className={location.pathname.includes(route.path) ? 'active' : ''} to={match.path + route.path}>
                  <route.icon />
                  {route.name}
                </Link>
              </li>
            ))}
          </List>
        </LeftBar>

        <main className="rui-content-wrapper">
          <ManageRoute match={match}/>
        </main>
      </div>
    </div>
  )
}
