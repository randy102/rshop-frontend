import React from 'react'
import { Form, Input, InputNumber } from 'antd'
import './rinput.scss'
import { currencyFormatter } from 'utils/string'

export default function RInput({value, number=false, price=false, textarea=false, name,label,rules, disabled = false, visible = true, placeholder, prefix,suffix,onChange=()=>{}}) {
  const itemProps = {
    name,
    label,
    rules: [{
      ...rules,
      whitespace: !!rules?.required,
      type: (number || price) ? 'number' : rules?.type
    }]
  }

  const inputProps = {
    prefix,
    suffix,
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
      let value = (number || price) ? e : e.target.value
      onChange(value)
    }
  }

  if(price){
    inputProps.formatter = (value => 'đ ' + currencyFormatter(value))
    inputProps.parser = (value => value.replace(/đ\s?|(,*)/g, ''))
  }

  var InputType = Input
  InputType = textarea ? Input.TextArea : InputType
  InputType = (number || price) ? InputNumber : InputType

  return visible && (
    <Form.Item {...itemProps}>
      <InputType {...inputProps}/>
    </Form.Item>
  )
}
