import React from 'react'
import './header.scss'
import { Link } from 'react-router-dom'
import brand from './brand.png'
import { Jwt } from 'utils/jwt'
import { Dropdown } from 'antd'

export default function Header() {
  function renderAuth() {
    if (Jwt.isSet()) {
      return (
        <Link to="/manage">
          Trang quản lý
        </Link>
      )
    } else {
      return (
        <>
          <Link to='/register'>
            Đăng ký
          </Link>
          <Link to='/login'>
            Đăng nhập
          </Link>
        </>
      )
    }
  }

  return (
    <div className='rui-home-header-wrap'>
      <Link to='/'>
        <img alt='logo' src={brand} />
      </Link>
      <div className='rui-home-header-right'>
        {renderAuth()}
      </div>
    </div>
  )
}
