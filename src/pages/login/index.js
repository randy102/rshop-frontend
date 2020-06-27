import React, { useState } from 'react'
import LogForm from 'components/commons/logform'
import { Form, Button, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './queries'
import RForm from 'components/admin/form'
import RInput from 'components/admin/form/rinput'
import RPassword from 'components/admin/form/rpassword'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Jwt } from 'utils/jwt'
import { useHistory, Redirect } from 'react-router-dom'


document.title = 'Đăng nhập'

export default function Login() {
  let [submitLoading, setSubmitLoading] = useState(false)
  let history = useHistory()
  let [login] = useMutation(LOGIN)
  let [form] = Form.useForm()
  
  if(Jwt.isSet()) return <Redirect to='/' />

  function handleLogin() {
    form.validateFields().then((input) => {
      setSubmitLoading(true)
      login({ variables: { input } })
        .then(result => {
          const token = result.data.loginUser
          
          Jwt.set(token)
          setSubmitLoading(false)
          history.push('/admin')
        })
        .catch(err => {
          setSubmitLoading(false)
          message.error(err.message)
        })
    })
  }

  return (
    <LogForm title="Đăng nhập">
      <RForm form={form} onEnter={handleLogin}>
        <RInput
          label='Email'
          placeholder='Nhập email...'
          name='email'
          rules={{ type: 'email', required: true }}
          prefix={<MailOutlined />}
        />

        <RPassword
          label='Mật khẩu'
          placeholder='Nhập mật khẩu...'
          name='password'
          rules={{ required: true, min: 8 }}
          prefix={<LockOutlined />}
        />

        <Button loading={submitLoading} style={{ marginTop: 5 }} block type='primary' onClick={handleLogin}>Đăng nhập</Button>
        <Button style={{ marginTop: 15 }} block href='/register'>Tạo tài khoản</Button>
      </RForm>
    </LogForm>
  )
}
