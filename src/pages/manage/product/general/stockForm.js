import React, { useEffect, useState } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'

import { Form as AntForm, message, Divider, Modal } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_STOCK, UPDATE_STOCK } from './queries'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import RInput from 'components/admin/Form/RInput'
import RUploads from 'components/admin/Form/RUploads'

const CONFIG = {
  FORM_NAME: 'Phân loại mới'
}

export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch, idProduct }) {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [imgs, setImgs] = useState()
  const [uploadApi, setUploadApi] = useState()

  const [form] = AntForm.useForm()
  const [create] = useMutation(CREATE_STOCK)
  const [update] = useMutation(UPDATE_STOCK)


  // eslint-disable-next-line
  useEffect(() => {
    form.resetFields()
    setImgs(initRow?.imgs)
  }, [initRow])

  const initialValues = {
    ...initRow,
    name: initRow?.name || 'Mặc định',
    long: initRow?.info.long || 0,
    width: initRow?.info.width || 0,
    height: initRow?.info.height || 0,
    weight: initRow?.info.weight || 0,
  }

  function clearFormData() {
    form.resetFields()
    setInitRow(undefined)
    setOpenForm(false)
    refetch()
    setImgs(undefined)
  }

  function handleCloseForm(){
    if(!initRow && imgs){
      Modal.confirm({
        title: 'Các hình ảnh tải lên sẽ bị xóa. Bạn muốn có muốn lưu trước khi thoát?',
        okText: 'Có',
        cancelText: 'Thoát',
        onCancel: () => {
          uploadApi.removeAll()
          clearFormData()
        }
      })
    } 
    else if(initRow){
      const bothNull = !initRow.imgs && !imgs
      const lengthMatch =  initRow.imgs?.length === imgs?.length
      const imgMatch = initRow.imgs?.every((img, i) => img === imgs[i])
      if(!bothNull && (!lengthMatch || !imgMatch)){
        handleSubmit()
      } else {
        clearFormData()
      }
    }
    else {
      clearFormData()
    }
  }

  function handleSubmit() {
    form.validateFields()
      .then(input => {
        // If create
        if (!initRow) {
          const toCreate = { ...input, idProduct, imgs }
          create({ variables: { idShop: currentShop?._id, input: toCreate } })
            .then(() => {
              message.success(`Tạo thành công`)
              clearFormData()
            }).catch(e => message.error(e.message))
        }

        // If update
        else {
          let { ...toUpdate } = { ...input, _id: initRow._id, imgs } || {}
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
      onClick: handleCloseForm,
    }
  ]

  return (
    <Drawer
      title={initRow ? initRow.name : CONFIG.FORM_NAME}
      onClose={handleCloseForm}
      visible={openForm}
      footDef={footDef}
    >
      <RForm form={form} initialValues={initialValues}>
        <RInput
          label='Tên phân loại'
          name='name'
          placeholder='Màu sắc, kích thước, hình dạng... '
          rules={{ required: true }}
        />

        <RInput
          price
          label='Giá bán'
          name='salePrice'
          rules={{ required: true, min: 0 }}
        />

        <RUploads
          label='Ảnh sản phẩm'
          initIds={initRow?.imgs}
          onChange={ids => {
            setImgs(ids)
          }}
          uploadApi={setUploadApi}
        />

        <Divider style={{fontWeight: 'bold'}} orientation='left'>Thông số sản phẩm</Divider>

        <RInput
          number
          label='Dài (m)'
          name='long'
          suffix='m'
        />

        <RInput
          number
          label='Rộng (m)'
          name='width'
        />

        <RInput
          number
          label='Cao (m)'
          name='height'
        />

        <RInput
          number
          label='Cân nặng (kg)'
          name='weight'
        />
      </RForm>
    </Drawer>
  )
}
