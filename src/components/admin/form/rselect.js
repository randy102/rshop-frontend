import React from 'react'
import { Form, Select } from 'antd'
import { removeAccents } from 'utils/string'

export default function RSelect({ disabled = false, required = false, name, label, data = [], prefix, showSearch, placeholder, filterProps = () => { },onChange = () => { }, refetch = () => { }, optionRender=() =>{}, optionValue=()=>{} }) {

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
    onChange: val => {
      onChange(val)
    },
    onFocus: () => refetch(),
    key: name,
    showSearch,
    filterOption: (input, option) => {
      let row = data?.find(r => r._id === option.key)
      let filterArr = filterProps(row)
      return filterArr.some(val => removeAccents(val).toLowerCase().indexOf(removeAccents(input).toLowerCase()) >= 0)
    }
  }

  return (
    <Form.Item {...itemProps}>
      <Select {...inputProps}>
        {data && data.map(row => {
          return <Select.Option key={row._id} value={optionValue(row)}>{optionRender(row)}</Select.Option>
        })}
      </Select>
    </Form.Item>
  )
}
