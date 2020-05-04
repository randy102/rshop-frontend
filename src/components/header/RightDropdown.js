import React from 'react'
import { Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'

export default function RightDropdown({overlay}) {
  return (
    <div className="rui-float-right">
      <Dropdown overlay={overlay} placement="bottomCenter">
        <Button>User <DownOutlined /></Button>
      </Dropdown>
    </div>
  )
}
