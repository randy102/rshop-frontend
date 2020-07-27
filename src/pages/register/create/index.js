import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import RForm from 'components/admin/Form'
import RInput from 'components/admin/Form/RInput'
import { Button, Result, Form, message, Modal } from 'antd'
import RPassword from 'components/admin/Form/RPassword'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER_USER } from './queries'

export default function RegisterCreate() {
  let { token } = useParams()
  let [form] = Form.useForm()
  let [submitLoading, setSubmitLoading] = useState(false)
  let [password, setPassword] = useState()
  let history = useHistory()

  let [registerUser] = useMutation(REGISTER_USER)

  function handleRegister() {
    form.validateFields().then(fields => {
      let {repassword, ...input} = {...fields, token}

      setSubmitLoading(true)

      registerUser({variables: {input}})
        .then(({data}) => {
          setSubmitLoading(false)
          const {email} = data.registerUser.credential

          Modal.success({
            title: 'Thành công',
            content: `Hiện bạn có thể đăng nhập bằng tài khoản ${email}`,
            onOk: () => history.push('/login')
          })
        })
        .catch(e => {
          setSubmitLoading(false)
          message.error(e.message)
        })
    })
  }

  return (
    <Result
      status="success"
      title="Xác thực thành công!"
      subTitle="Giờ bạn có thể tạo tài khoản cho email đã xác thực này"
      extra={[
        <RForm style={{ width: 400, margin: '0 auto' }} form={form} onEnter={handleRegister}>
          <RInput
            label='Họ tên'
            placeholder='Nhập họ tên...'
            name='fullName'
            prefix={<UserOutlined />}
            rules={{ required: true }}
          />

          <RPassword
            prefix={<LockOutlined />}
            label='Mật khẩu'
            placeholder='Nhập mật khẩu...'
            name='password'
            onChange={v => setPassword(v)}
            rules={{ required: true, min: 8 }}
          />

          <RPassword
            prefix={<LockOutlined />}
            label='Xác nhận mật khẩu'
            placeholder='Nhập lại mật khẩu...'
            name='repassword'
            rules={{ required: true, pattern: new RegExp(password) }}
          />

          <Button
            loading={submitLoading}
            style={{ marginTop: 15 }}
            block
            type='primary'
            onClick={handleRegister}
          >
            Tạo tài khoản
         </Button>
        </RForm>

      ]}
    />
  )
}
