import React from 'react'
import './shop-header.scss'
import { Link } from 'react-router-dom'
import { Dropdown, Button, Menu, Empty } from 'antd'
import { DownOutlined, UserOutlined, PlusOutlined, ShopOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER_SHOPS } from './queries'

export default function ShopHeader() {
  const { data } = useQuery(GET_USER_SHOPS)

  function renderShops() {
    if(data.userShops.length)
    return (
      <Menu>
        {data.userShops.map(shop => (
          <Menu.Item key={shop._id}>
            {shop.name}
          </Menu.Item>
        ))}
      </Menu>
    )
    else return (
      <Menu>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false}>
          <div style={{padding: '10px'}}>
            Bạn chưa có cửa hàng nào!
          </div>
          <Button href="/manage/shop/create" type="primary">Tạo ngay</Button>
        </Empty>
      </Menu>
    )

  }

  return (
    <div className="rui-admin-shop-header">

      <div className="item">
        <Dropdown overlay={data && renderShops()}>
          <Link><ShopOutlined /> Cửa hàng <DownOutlined /></Link>
        </Dropdown>
      </div>

      <div className="item">
        <Link to="/manage/shop/create">
          <PlusOutlined /> Tạo cửa hàng
        </Link>
      </div>
    </div>
  )
}
