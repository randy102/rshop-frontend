import React, { useEffect } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'

import { Form as AntForm, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import {  } from './queries'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'

const CONFIG = {
  FORM_NAME: ''
}

export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  const [currentShop] = useRecoilState(CURRENT_SHOP)
  
  const [form] = AntForm.useForm()
  const [create] = useMutation()
  const [update] = useMutation()
  

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

  const footDef = [
    {
      name: 'Lưu',
      type: 'danger',
      onClick: () => {
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
      title={initRow ? initRow.user.profile.fullName : CONFIG.FORM_NAME}
      onClose={clearFormData}
      visible={openForm}
      footDef={footDef}
    >
      <RForm form={form} initialValues={initialValues}>
        

      </RForm>
    </Drawer>
  )
}
