import React from 'react'
import './shop-header.scss'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Button, Menu, Empty, Badge } from 'antd'
import { DownOutlined, PlusOutlined, ShopOutlined, LinkOutlined, BellFilled } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { USER_SHOPS } from 'recoil/atoms/userShops'

export default function ShopHeader() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)
  const [userShops] = useRecoilState(USER_SHOPS)
  const history = useHistory()

  function renderShops() {
    if (userShops?.length)
      return (
        <Menu>
          {userShops.map(shop => (
            <Menu.Item key={shop._id} onClick={() => history.push(`/${shop.domain}/manage`)}>
              <Badge color={shop.isActive?'green':'red'}/> {shop.name}
            </Menu.Item>
          ))}
        </Menu>
      )
    else return (
      <Menu>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false}>
          <div style={{ padding: '10px' }}>
            Bạn chưa có cửa hàng nào!
          </div>
          <Button href="/0/manage/shop/create" type="primary">Tạo ngay</Button>
        </Empty>
      </Menu>
    )
  }

  function renderNotif() {
   
    return (
      <Menu>
        <Menu.Item >
          Thông báo
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div className="rui-admin-shop-header">

      <div className="item">
        <Dropdown overlay={renderShops()}>
          <Link><ShopOutlined /> {currentShop?.name || 'Cửa hàng'} <DownOutlined /></Link>
        </Dropdown>
      </div>

      <div className="item">
        <Link to={`/${currentShop?.domain || '0'}/manage/shop/create`}>
          <PlusOutlined /> Tạo cửa hàng
        </Link>
      </div>

      <div className="item">
        <a href={`http://${currentShop?.domain || '0'}.${window.location.host}`}>
          <LinkOutlined /> Xem cửa hàng
        </a>
      </div>

      <div className="item">
        <Dropdown overlay={renderNotif()}>
          <Link><Badge dot><BellFilled /></Badge></Link>
        </Dropdown>
      </div>
    </div>
  )
}
