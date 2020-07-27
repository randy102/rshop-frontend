import React, { useState } from 'react'
import LogForm from 'components/commons/LogForm'
import RForm from 'components/admin/Form'
import RInput from 'components/admin/Form/RInput'
import { Button, Form, message } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import { REQUEST_CONFIRM } from './queries'
import { useHistory, Redirect } from 'react-router-dom'
import { Jwt } from 'utils/jwt'

export default function Register() {
  let [form] = Form.useForm()
  let [requestConfirm] = useMutation(REQUEST_CONFIRM)
  let [submitLoading, setSubmitLoading] = useState(false)
  let history = useHistory()
  
  if(Jwt.isSet()) return <Redirect to='/' />

  function handleRegister() {
    form.validateFields().then(input => {
      setSubmitLoading(true)
      requestConfirm({ variables: { input } })
        .then(result => {
          setSubmitLoading(false)
          history.push('/register/confirm',{email: result.data.requestEmailConfirm})
        })
        .catch(error => {
          setSubmitLoading(false)
          message.error(error.message)
        })
    })
  }


  return (
    <LogForm title="Đăng ký">
      <RForm form={form} onEnter={handleRegister}>
        <RInput
          label='Email'
          placeholder='Nhập email...'
          name='email'
          rules={{ type: 'email', required: true }}
          prefix={<MailOutlined />}
        />

        <Button
          loading={submitLoading}
          style={{ marginTop: 15 }}
          block
          type='primary'
          onClick={handleRegister}
        >
          Tiếp tục
         </Button>
      </RForm>
    </LogForm>
  )
}
