import React from 'react'
import { Form, Radio } from 'antd'
import './rradio.scss'

// export default class RRadio extends React.Component{
//   constructor(props){
//     super(props)
//   }

//   static Image = 

//   render(){
//     return <FRRadio {...this.props}/>
//   }
// }

// function FRRadioImage

function RRadio({ disabled = false, required = false, name, label, data = [], prefix, placeholder, onChange = () => { }, optionRender=() =>{}, optionValue=()=>{} }) {

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

RRadio.ImageItem = function ImageItem({children, style}){
  return <div style={style} className="radio-image-item">{children}</div>
}

RRadio.ImageItem.Title = function ImageTitle({children, style}){
  return <div style={style} className="radio-image-title">{children}</div>
}

export default RRadio