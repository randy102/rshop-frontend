import React from 'react'
import { Result, Button } from 'antd'

document.title = 'Lỗi 403'
export default function CredentialError() {
  return (
    <Result
      status="403"
      title="Thông tin tài khoản đã thay đổi"
      subTitle="Vui lòng đăng nhập lại để tiếp tục"
      extra={<Button href='/login' type="primary">Đăng nhập</Button>}
    />
  )
}
