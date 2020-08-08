import React, { useEffect, useState } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'
import RInput from 'components/admin/Form/RInput'
import { Form as AntForm, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_TEMPLATES, UPDATE_TEMPLATES } from './queries'
import RSwitch from 'components/admin/Form/RSwitch'
import RUpload from 'components/admin/Form/RUpload'


export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  const [form] = AntForm.useForm()
  const [create] = useMutation(CREATE_TEMPLATES)
  const [update] = useMutation(UPDATE_TEMPLATES)

  const [uploadApi, setUploadApi] = useState()
  const [demo, setDemo] = useState()

  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  function clearFormData() {
    form.resetFields()
    uploadApi.reset()
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
              const toCreate = {
                ...input,
                demoImg: demo
              }
              create({ variables: { input: toCreate } })
                .then(() => {
                  message.success(`Tạo thành công`)
                  clearFormData()
                }).catch(e => message.error(e.message))
            }
            // If update
            else {
              let {code,...toUpdate} = { 
                ...input, 
                _id: initRow._id,
                demoImg: demo || initRow.demoId
              }
              update({ variables: { input: toUpdate } })
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

  function handleDemoImgChange(id){
  
    setDemo(id)
    if(initRow){
      let {code,__typename,...toUpdate} = { 
        ...initRow,
        demoImg: id || ''
      }
     
      update({ variables: { input: toUpdate } })
        .then(() => {
          message.success(`Cập nhật thành công`)
          refetch()
        }).catch(e => message.error(e.message))
    }
  }

  return (
    <Drawer
      footDef={footDef}
      title={initRow ? initRow.name : 'Chủ đề mới'}
      onClose={clearFormData}
      visible={openForm}
    >
      <RForm form={form} initialValues={initRow}>

        <RInput
          label='Tên'
          placeholder='Nhập tên chủ đề...'
          name='name'
          rules={{
            required: true
          }}
        />



        <RInput
          label='Mã'
          placeholder='Nhập mã...'
          name='code'
          disabled={initRow}
          rules={{
            required: true
          }}
        />

        <RSwitch
          label='Trạng thái'
          name='isActive'
          checkedText='Xuất bản'
          unCheckedText='Ẩn'
        />

        <RUpload
          label='Ảnh'
          url={process.env.REACT_APP_PHOTO_API}
          viewUrl={process.env.REACT_APP_S3URL}
          initId={initRow?.demoImg}
          cropShape='rect'
          onChange={handleDemoImgChange}
          uploadApi={api => setUploadApi(api)}
        />

      </RForm>
    </Drawer>
  )
}
