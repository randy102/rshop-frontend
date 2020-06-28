import React from 'react'
import { Form, Switch as AntSwitch } from 'antd'

function Switch(props){
  var modifiedProps = {
    ...props,
    checked: props.value
  }
  return <AntSwitch {...modifiedProps}/>
}

export default function RSwitch({name, label, checkedText, unCheckedText, onChange, visible=true}) {
  var itemProps = {
    name,
    label
  }

  var switchProps = {
    checkedChildren: checkedText,
    unCheckedChildren: unCheckedText,
    onChange
  }
  return visible && (
    <Form.Item {...itemProps}>
      <Switch  {...switchProps}/>
    </Form.Item>
  )
}
