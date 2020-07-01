import React from 'react'
import RForm from 'components/admin/form'
import RPassword from 'components/admin/form/rpassword'
import { Button, PageHeader, Form, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CHANGE_USER_PASSWORD } from './queries'
import { Jwt } from 'utils/jwt'
import { useSetRecoilState } from 'recoil'
import { CURRENT_USER } from 'recoil/atoms/currentUser'

export default function Password() {
  var [form] = Form.useForm()
  var [changePassword] = useMutation(CHANGE_USER_PASSWORD)

  function handleSubmit(){
    form.validateFields().then(input => {
      if(input.new !== input.renew) {
        message.error('Xác nhận mật khẩu không đúng')
        return
      } else {
        let {renew, ...toUpdate} = input 
        changePassword({variables: {input: toUpdate}})
          .then(res => {
            Jwt.set(res.data.changeUserPassword)
            message.success('Cập nhật thành công')
          })
          .catch(e => message.error(e.message))
      }
    })
  }

  return (
    <RForm form={form} style={{ width: '400px', margin: '15px 50px' }}>
      <RPassword
        label='Mật khẩu hiện tại'
        name='old'
        placeholder='Nhập mật khẩu hiện tại của bạn...'
        rules={{
          required: true
        }}
      />

      <RPassword
        label='Mật khẩu mới'
        name='new'
        placeholder='Nhập mật khẩu mới...'
        rules={{
          required: true,
          min: 8
        }}
      />

      <RPassword
        label='Xác nhận mật khẩu'
        name='renew'
        placeholder='Nhập lại mật khẩu mới...'
        rules={{
          required: true,
          min: 8
        }}
      />

      <Button onClick={handleSubmit} type='primary'>Cập nhật</Button>
    </RForm>
  )
}
