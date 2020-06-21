import React from 'react'
import { Drawer as AntDrawer, Button } from 'antd'

export default function Drawer({ visible, onClose, title, footDef = [], children }) {
  const footer = footDef.length && footDef.map(({ name, onClick, visible = true, type = '' }) => {
    return (
      <Button
        key={name}
        type={type}
        onClick={onClick}
        style={{ display: !visible && 'none', margin:'0 5px' }}
      >
        {name}
      </Button>)
  })

  return (
    <AntDrawer
      width={500}
      visible={visible}
      onClose={onClose}
      title={title}
      footer={
        <div style={{ textAlign: 'right' }}>
          {footer}
        </div>
      }
    >
      {children}
    </AntDrawer>
  )
}
