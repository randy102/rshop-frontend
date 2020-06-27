import React from 'react'
import { Result, Button } from 'antd'

document.title = 'Lỗi 403'
export default function AuthError() {
  return (
    <Result
      status="403"
      title="Không có quyền truy cập"
      subTitle="Xin lỗi, bạn không được phép truy cập vào trang này"
      extra={<Button href='/' type="primary">Về trang chủ</Button>}
    />
  )
}
