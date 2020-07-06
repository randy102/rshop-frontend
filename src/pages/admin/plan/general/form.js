import React, { useEffect } from 'react'
import Drawer from 'components/admin/drawer'
import RForm from 'components/admin/form'
import RInput from 'components/admin/form/rinput'
import { Form as AntForm, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_PLAN, CREATE_PLAN } from './queries'


export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  const [form] = AntForm.useForm()
  const [create] = useMutation(CREATE_PLAN)
  const [update] = useMutation(UPDATE_PLAN)

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
                  message.success(`Tạo thành công`)
                  clearFormData()
                }).catch(e => message.error(e.message))
            }
            // If update
            else {
              let updateInput = { ...input, _id: initRow._id } || {}
              update({ variables: { input: updateInput } })
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
      title={initRow ? initRow.name : 'Gói mới'}
      onClose={clearFormData}
      visible={openForm}
    >
      <RForm form={form} initialValues={initRow}>

        <RInput
          label='Tên'
          placeholder='Nhập tên gói...'
          name='name'
          rules={{
            required: true
          }}
        />



        <RInput
          label='Ngày sử dụng'
          placeholder='Nhập số ngày sử dụng...'
          name='duration'
          number
          rules={{ min: 1, required: true }}
        />

        <RInput
          label='Giá'
          placeholder='Nhập giá tiền...'
          name='price'
          price
          rules={{ required: true }}
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
