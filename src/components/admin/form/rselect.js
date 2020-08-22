import React from 'react'
import { Form, Select } from 'antd'
import { removeAccents } from 'utils/string'

function RSelect({mode, disabled = false, required = false, name, label, data = [], prefix, showSearch, placeholder, filterProps = () => { },onChange = () => { }, refetch = () => { }, optionRender=() =>{}, optionValue=()=>{}, labelRender=()=>{}, validator, onSearch=()=>{} }) {

  const itemProps = {
    name,
    label,
    rules: [
      {required}
    ]
  }
  if(validator) itemProps.rules.push({validator})
  
  const inputProps = {
    mode,
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
    },
    optionLabelProp: 'label',
    onSearch
  }

  return (
    <Form.Item {...itemProps}>
      <Select {...inputProps}>
        {data && data.map(row => {
          return <Select.Option label={labelRender(row)} key={row._id} value={optionValue(row)}>{optionRender(row)}</Select.Option>
        })}
      </Select>
    </Form.Item>
  )
}

export default RSelect