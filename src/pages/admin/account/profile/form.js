import React, { useEffect } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'
import RInput from 'components/admin/Form/RInput'
import { Form as AntForm, message } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import RUpload from 'components/admin/Form/RUpload'
import { UPDATE_USER_PROFILE } from './queries'
import RDate from 'components/admin/Form/RDate'
import * as moment from 'moment'

export default function Form({ openForm, setOpenForm, initRow, refetch }) {
  const [form] = AntForm.useForm()
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE)


  const initialValues = initRow && {
    dob: moment(initRow.profile.dob),
    fullName: initRow.profile.fullName,
    address: initRow.profile.address,
    phone: initRow.profile.phone,
  }

  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  function clearFormData() {
    form.resetFields()
    setOpenForm(false)
    refetch()
  }

  function handleAvatarChange(imageId) {
    updateProfile({ variables: { input: { ...initialValues, avatar: imageId, dob: initRow.profile.dob } } })
      .then(() => {
        message.success(`Cập nhật thành công`)
        refetch()
      }).catch(e => message.error(e.message))
  }

  const footDef = [
    {
      name: 'Lưu',
      type: 'danger',
      onClick: () => {
        form.validateFields()
          .then(input => {

            const toUpdate = {
              ...input, 
              avatar: initRow.profile.avatar, 
              dob: input.dob.valueOf()
            }

            updateProfile({ variables: { input: toUpdate } })
              .then(() => {
                message.success(`Cập nhật thành công`)
                clearFormData()
              }).catch(e => message.error(e.message))

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
      title='Hồ sơ'
      onClose={clearFormData}
      visible={openForm}
    >
      <RForm form={form} initialValues={initRow && initialValues}>
        <RInput
          label='Họ tên'
          placeholder='Nhập họ tên...'
          name='fullName'
        />

        <RInput
          label='Số điện thoại'
          placeholder='Nhập số điện thoại...'
          name='phone'
          rules={{
            pattern: /^[0-9]*$/
          }}
        />

        <RInput
          label='Địa chỉ'
          placeholder='Nhập địa chỉ...'
          name='address'
        />

        <RDate
          label='Ngày sinh'
          name='dob'
        />

        <RUpload
          label='Ảnh đại diện'
          url={process.env.REACT_APP_PHOTO_API}
          viewUrl={process.env.REACT_APP_S3URL}
          onChange={handleAvatarChange}
          initId={initRow && initRow.profile.avatar}
        />
      </RForm>
    </Drawer>
  )
}
