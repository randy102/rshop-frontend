import React, { useEffect } from 'react'
import Drawer from 'components/admin/drawer'
import RForm from 'components/admin/form'
import RInput from 'components/admin/form/rinput'
import { Form as AntForm, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER, UPDATE_USER } from './queries'
import RSwitch from 'components/admin/form/rswitch'

export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  const [form] = AntForm.useForm()
  const [create] = useMutation(CREATE_USER)
  const [update] = useMutation(UPDATE_USER)

  
  const initialValues = initRow && {
    email: initRow.credential.email,
    fullName: initRow.profile.fullName,
    isAdmin: initRow.isAdmin
  }

  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  function clearFormData() {
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(false)
    refetch()
  }

  const footDef = [
    {
      name: 'Lưu',
      type: 'danger',
      onClick: () => {
        form.validateFields()
          .then(input => {
            // If create
            if (!initRow) {
              create({ variables: { input } })
                .then(res => {
                  message.success(`Tạo thành công ${res.data.createUser.credential.email}`)
                  clearFormData()
                }).catch(e => message.error(e.message))
            } 
            // If update
            else {
              let {email, fullName, ...updateInput} = {...input, _id: initRow._id} || {}
              update({variables: {input: updateInput}})
                .then(res => {
                  message.success(`Cập nhật thành công ${res.data.updateAdmin.credential.email}`)
                  clearFormData()
                }).catch(e => message.error(e.message))
            }
          }).catch(err => message.error(err.message))
      }
    },

    {
      name: 'Hủy',
      onClick: clearFormData,
    }
  ]

  return (
    <Drawer
      footDef={footDef}
      title={initRow ? initialValues.fullName : 'Người dùng mới'}
      onClose={clearFormData}
      visible={openForm}
    >
      <RForm form={form} initialValues={initRow && initialValues}>
        <RInput
          label='Email'
          placeholder='Nhập email...'
          name='email'
          disabled={initRow}
          rules={{
            type: 'email',
            required: true
          }}
        />

        <RInput
          label='Họ tên'
          placeholder='Nhập họ tên...'
          name='fullName'
          disabled={initRow}
        />

        <RInput
          label='Mật khẩu mặc định'
          disabled={true}
          value='12345678'
          visible={!initRow}
        />

        <RSwitch
          label='Vai trò'
          name='isAdmin'
          checkedText='Admin'
          unCheckedText='User'
        />
      </RForm>
    </Drawer>
  )
}
