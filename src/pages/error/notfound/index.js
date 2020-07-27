import React from 'react'
import { Result } from 'antd'

document.title = 'Lỗi 404'
export default function NotFoundError() {
  return (
    <Result
      status="404"
      title="Trang không tồn tại"
    />
  )
}
