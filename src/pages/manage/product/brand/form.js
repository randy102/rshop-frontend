import React, { useEffect, useState } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'

import { Form as AntForm, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_BRAND, UPDATE_BRAND } from './queries'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import RInput from 'components/admin/Form/RInput'
import RUpload from 'components/admin/Form/RUpload'

const CONFIG = {
  FORM_NAME: 'Thương hiệu mới'
}

export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  const [currentShop] = useRecoilState(CURRENT_SHOP)
  const [img, setImg] = useState()

  const [form] = AntForm.useForm()
  const [create] = useMutation(CREATE_BRAND)
  const [update] = useMutation(UPDATE_BRAND)


  // eslint-disable-next-line
  useEffect(() =>{ 
    form.resetFields()
    setImg(initRow?.img)
  }, [initRow])

  const initialValues = {
    ...initRow,

  }

  function clearFormData() {
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(false)
    refetch()
  }

  function handleSubmit(img = '', remainForm = false) {
    form.validateFields()
      .then(input => {
        // If create
        if (!initRow) {
          const toCreate = {...input, img}
          create({ variables: { idShop: currentShop?._id, input: toCreate} })
            .then(() => {
              message.success(`Tạo thành công`)
              if(!remainForm) clearFormData()
            }).catch(e => message.error(e.message))
        }

        // If update
        else {
          const { ...toUpdate } = { 
            ...input, 
            _id: initRow._id, 
            img
          } || {}

          update({ variables: { idShop: currentShop?._id, input: toUpdate } })
            .then(() => {
              message.success(`Cập nhật thành công`)
              if(!remainForm) clearFormData()
            }).catch(e => message.error(e.message))
        }
      }).catch(err => message.error(err.message))
  }

  const footDef = [
    {
      name: 'Lưu',
      type: 'danger',
      onClick: () => {
        handleSubmit(img)
      }
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
          label='Tên'
          name='name'
          rules={{ required: true }}
        />

        <RInput
          label='Giới thiệu'
          name='intro'
          textarea
        />

        <RUpload
          label="Logo"
          cropShape='rect'
          onChange={(id) => {
            setImg(id)
            if(initRow) handleSubmit(id, true)
          }}
          initId={img}
        />
      </RForm>
    </Drawer>
  )
}
