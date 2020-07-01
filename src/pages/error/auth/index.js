import React from 'react'
import { Result, Button } from 'antd'

document.title = 'Lỗi 401'
export default function AuthError() {
  return (
    <Result
      status="404"
      title="Lỗi xác thực"
      subTitle="Vui lòng đăng nhập để tiếp tục"
      extra={<Button href='/login' type="primary">Đăng nhập</Button>}
    />
  )
}
