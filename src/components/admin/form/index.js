import React from 'react'
import { Form as AntForm } from 'antd'



export default function RForm({ children, form, initialValues, onEnter = () => { } }) {

  return (
    <AntForm
      onKeyPress={(e) => e.key === 'Enter' && onEnter()}
      form={form}
      layout='vertical'
      autoComplete='off'
      initialValues={initialValues}
      validateMessages={validateMessages}
    >
      {children}
    </AntForm>
  )
}

var validateMessages = {
  // eslint-disable-next-line
  required: "'${label}' không được trống!",
  // eslint-disable-next-line
  whitespace: "'${label}' không được trống!",
  string: {
    // eslint-disable-next-line
    min: "'${label}' phải tối thiểu ${min} ký tự",
    // eslint-disable-next-line
    max: "'${label}' không được quá ${max} ký tự",
    // eslint-disable-next-line
    range: "'${label}' phải từ ${min} đến ${max} ký tự",
  },
  number: {
    // eslint-disable-next-line
    min: "'${label}' phải lớn hơn ${min}",
    // eslint-disable-next-line
    max: "'${label}' phải nhỏ hơn ${max}",
    // eslint-disable-next-line
    range: "'${label}' phải trong khoảng ${min} đến ${max}",
  },
  pattern: {
    // eslint-disable-next-line
    mismatch: "'${label}' không đúng định dạng",
  },
  types: {
    // eslint-disable-next-line
    integer: "'${label}' phải là số nguyên",
    // eslint-disable-next-line
    number: "'${label}' phải là số",
    // eslint-disable-next-line
    email: "'${label}' không đúng định dạng",
    // eslint-disable-next-line
    url: "'${label}' phải có dạng http://... hoặc https://...",
  },
}