import React from 'react'
import { PoweroffOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'

export default function Logout() {
  return (
    <Result
      status="info"
      title="Bạn có chắc muốn đăng xuất?"
      extra={
        <Button href="/logout" type="primary" key="console" icon={<PoweroffOutlined />}>
          Đăng xuất
      </Button>
      }
    />
  )
}
