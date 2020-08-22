import React, { useEffect } from 'react'
import Drawer from 'components/admin/Drawer'
import RForm from 'components/admin/Form'
import RInput from 'components/admin/Form/RInput'
import { Form as AntForm, message } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_ROLE, UPDATE_ROLE, GET_USERS_BY_EMAIL } from './queries'
import RSelect from 'components/admin/Form/RSelect'

import { GET_PERMISSION } from 'pages/admin/permission/general/queries'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'


export default function Form({ openForm, setOpenForm, initRow, setInitRow, refetch }) {
  const [currentShop] = useRecoilState(CURRENT_SHOP)
  
  const [form] = AntForm.useForm()
  const [create] = useMutation(CREATE_ROLE)
  const [update] = useMutation(UPDATE_ROLE)
  const { data: userData, refetch: userRefetch } = useQuery(GET_USERS_BY_EMAIL, {variables: {idShop: currentShop?._id, email: ''}})
  const { data: permissionData, refetch: permissionRefetch } = useQuery(GET_PERMISSION)

  // eslint-disable-next-line
  useEffect(() => form.resetFields(), [initRow])

  const initialValues = {
    ...initRow,
    idPermissions: initRow?.permissions.map(p => p._id),
    idUser: initRow?.user._id
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
              let {idUser,...toUpdate} = { ...input, _id: initRow._id } || {}
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
      title={initRow ? initRow.user.profile.fullName : 'Thành viên mới'}
      onClose={clearFormData}
      visible={openForm}
      footDef={footDef}
    >
      <RForm form={form} initialValues={initialValues}>
        <RSelect
          disabled={initRow}
          data={userData?.usersByEmail}
          name='idUser'
          label='Người dùng'
          placeholder='Nhập email người dùng'
          showSearch
          required
          filterProps={(row) => [row.profile.fullName, row.credential.email]}
          optionValue={row => row._id}
          labelRender={row => row.profile.fullName}
          optionRender={row => (
            <div>
              <b style={{ display: 'block' }}>{row.profile.fullName}</b>
              {row.credential.email}
            </div>
          )}
          onSearch={input => userRefetch({idShop: currentShop?._id, email: input})}
        />

        <RInput
          label='Vai trò'
          placeholder='Nhập vai trò...'
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

        <RSelect
          mode='multiple'
          data={permissionData?.permissions}
          name='idPermissions'
          label='Quyền'
          disabled={initRow && initRow.isMaster}
          showSearch
          refetch={permissionRefetch}
          filterProps={(row) => [row.name]}
          optionValue={row => row._id}
          labelRender={row => row.name}
          optionRender={row => (
            <div>
              <b style={{ display: 'block' }}>{row.name}</b>
              {row.description}
            </div>
          )}
        />
      </RForm>
    </Drawer>
  )
}
