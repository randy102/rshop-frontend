import React, { useEffect } from 'react'
import './shop-header.scss'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Button, Menu, Empty } from 'antd'
import { DownOutlined, PlusOutlined, ShopOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { USER_SHOPS } from 'recoil/atoms/userShops'
import Status from 'components/commons/Status'

export default function ShopHeader() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)
  const [userShops] = useRecoilState(USER_SHOPS)
  const history = useHistory()

  function renderShops() {
    if(userShops?.length)
    return (
      <Menu>
        {userShops.map(shop => (
          <Menu.Item key={shop._id} onClick={() => history.push(`/${shop.domain}/manage`)}>
            <Status type={shop.isActive ? 'active' : 'inactive'} content={shop.name}/>
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
        <Dropdown overlay={renderShops()}>
          <Link><ShopOutlined /> {currentShop?.name || 'Cửa hàng'} <DownOutlined /></Link>
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
