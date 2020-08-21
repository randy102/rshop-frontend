import React, { useEffect } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'

import { Form as AntForm, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_STORE, UPDATE_STORE } from './queries'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import RInput from 'components/admin/Form/RInput'

const CONFIG = {
  FORM_NAME: 'Kho hàng mới'
}

export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  const [currentShop] = useRecoilState(CURRENT_SHOP)
  
  const [form] = AntForm.useForm()
  const [create] = useMutation(CREATE_STORE)
  const [update] = useMutation(UPDATE_STORE)
  

  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  const initialValues = {
    ...initRow,

  }

  function clearFormData() {
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(false)
    refetch()
  }

  function handleSubmit() {
    form.validateFields()
          .then(input => {
            // If create
            if (!initRow) {
              create({ variables: { idShop: currentShop?._id, input } })
                .then(() => {
                  message.success(`Tạo thành công`)
                  clearFormData()
                }).catch(e => message.error(e.message))
            }

            // If update
            else {
              let {...toUpdate} = { ...input, _id: initRow._id } || {}
              update({ variables: { idShop: currentShop?._id, input: toUpdate } })
                .then(() => {
                  message.success(`Cập nhật thành công`)
                  clearFormData()
                }).catch(e => message.error(e.message))
            }
          }).catch(() => message.error('Lỗi nhập liệu'))
  }

  const footDef = [
    {
      name: 'Lưu',
      type: 'primary',
      onClick: handleSubmit
    },

    {
      name: 'Hủy',
      onClick: clearFormData,
    }
  ]

  return (
    <Drawer
      title={initRow ? initRow.name : CONFIG.FORM_NAME}
      onClose={clearFormData}
      visible={openForm}
      footDef={footDef}
    >
      <RForm form={form} initialValues={initialValues}>
        <RInput
          label='Tên kho'
          name='name'
          rules={{required: true}}
        />
        <RInput
          label='Địa chỉ'
          name='address'
        />
      </RForm>
    </Drawer>
  )
}
