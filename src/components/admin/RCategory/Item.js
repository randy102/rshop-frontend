import React from 'react'
import { Checkbox } from 'antd'

export default function Item({name, checked = false, onChange = () => { } }) {
  return (
    <div onClick={onChange} className={`item ${checked ? 'active' : ''}`}>
      <Checkbox checked={checked} >{name}</Checkbox>
    </div>
  )
}
