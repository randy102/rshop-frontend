import React from 'react'
import { Form, DatePicker } from 'antd'

export default function RDate({value, name, label, disabled = false, visible = true, prefix, onChange=()=>{}}) {
  const itemProps = {
    name,
    label
  }

  const inputProps = {
    format: 'DD/MM/YYYY',
    prefix,
    disabled,
    value,
    onKeyPress: e => {
      if(disabled) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    onPaste: e => {
      if(disabled) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    onChange: value => {
      onChange(value)
    }
  }

  return visible && (
    <Form.Item {...itemProps}>
      <DatePicker {...inputProps}/>
    </Form.Item>
  )
}
