import React from 'react'
import { Form, Radio } from 'antd'


export default function RRadio({ disabled = false, required = false, name, label, data = [], prefix, placeholder, onChange = () => { }, optionRender=() =>{}, optionValue=()=>{} }) {

  const itemProps = {
    name,
    label,
    rules: [{
      required
    }]
  }

  const inputProps = {
    prefix,
    disabled,
    placeholder,
    onChange: e => {
      onChange(e.target.value)
    },
    key: name,
  }

  return (
    <Form.Item {...itemProps}>
      <Radio.Group {...inputProps} style={{marginTop:5}}>
        {data && data.map(row => {
          return <Radio key={row._id} value={optionValue(row)}>{optionRender(row)}</Radio>
        })}
      </Radio.Group>
    </Form.Item>
  )
}
