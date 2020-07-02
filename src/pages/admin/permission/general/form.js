import React, { useEffect } from 'react'
import Drawer from 'components/admin/drawer'
import RForm from 'components/admin/form'
import RInput from 'components/admin/form/rinput'
import { Form as AntForm, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_PERMISSION, CREATE_PERMISSION } from './queries'


export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  var [form] = AntForm.useForm()
  var [createUser] = useMutation(CREATE_PERMISSION)
  var [updateUser] = useMutation(UPDATE_PERMISSION)

  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  function clearFormData() {
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(false)
    refetch()
  }

  var footDef = [
    {
      name: 'Lưu',
      type: 'danger',
      onClick: () => {
        form.validateFields()
          .then(input => {
            // If create
            if (!initRow) {
              createUser({ variables: { input } })
                .then(res => {
                  message.success(`Tạo thành công`)
                  clearFormData()
                }).catch(e => message.error(e.message))
            }
            // If update
            else {
              let updateInput  = { ...input, _id: initRow._id } || {}
              updateUser({ variables: { input: updateInput } })
                .then(res => {
                  message.success(`Cập nhật thành công`)
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
      title={initRow ? initRow.name : 'Quyền mới'}
      onClose={clearFormData}
      visible={openForm}
    >
      <RForm form={form} initialValues={initRow}>


        <RInput
          label='Tên'
          placeholder='Nhập tên quyền...'
          name='name'
          rules={{
            required: true
          }}
        />

        <RInput
          label='Mô tả'
          placeholder='Nhập mô tả...'
          name='description'
          textarea
        />

      </RForm>
    </Drawer>
  )
}
