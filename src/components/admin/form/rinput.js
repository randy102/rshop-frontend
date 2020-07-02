import React from 'react'
import { Form, Input } from 'antd'

export default function RInput({value, textarea=false, name,label,rules, disabled = false, visible = true, placeholder, prefix,onChange=()=>{}}) {
  const itemProps = {
    name,
    label,
    rules: [{
      ...rules,
      whitespace: !!rules?.required
    }]
  }

  const inputProps = {
    prefix,
    disabled,
    placeholder,
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
    onChange: e => {
      onChange(e.target.value)
    }
  }

  const InputType = textarea ? Input.TextArea : Input

  return visible && (
    <Form.Item {...itemProps}>
      <InputType {...inputProps}/>
    </Form.Item>
  )
}
