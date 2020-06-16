import React from 'react'
import { TeamOutlined, SlidersOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import './sidebar.scss'
import { Link, useRouteMatch } from 'react-router-dom'
import { Tooltip } from 'antd'

export default function SideBar(props) {
  const match = useRouteMatch()
  console.log(match)
  return (
    <div className='rui-sidebar'>
      <div className='rui-sidebar-item'>
        <Tooltip placement="right" title={'Bảng điều khiển'}>
          <Link to={match.path + '/test'}>
            <SlidersOutlined />
          </Link>
        </Tooltip>
      </div>

      <div className='rui-sidebar-item'>
        <Tooltip placement="right" title={'Khách hàng'}>
          <Link to={match.path + '/test'}>
            <TeamOutlined />
          </Link>
        </Tooltip>
      </div>

      <div className='rui-sidebar-item'>
        <Tooltip placement="right" title={'Sản phẩm'}>
          <Link to={match.path + '/test'}>
            <ShoppingCartOutlined />
          </Link>
        </Tooltip>
      </div>

    </div>
  )
}
