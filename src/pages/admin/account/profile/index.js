import React, { useState } from 'react'
import UserProfile from 'components/commons/UserProfile'
import { Button, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Form from './form'
import { GET_USER_PROFILE } from './queries'
import { useQuery } from '@apollo/react-hooks'
import * as moment from 'moment'

document.title = 'Hồ sơ'

export default function Profile() {
  const [openForm, setOpenForm] = useState(false)
  const { data, refetch } = useQuery(GET_USER_PROFILE)

  const profileData = data && [
    {
      title: 'Họ tên',
      content: data.currentUser.profile.fullName
    },
    {
      title: 'Email',
      content: data.currentUser.credential.email
    },
    {
      title: 'Số điện thoại',
      content: data.currentUser.profile.phone
    },
    {
      title: 'Địa chỉ',
      content: data.currentUser.profile.address
    },
    {
      title: 'Ngày sinh',
      content: moment(data.currentUser.profile.dob).format('DD/MM/YYYY')
    }
  ]

  return (
    <div>
      <Button onClick={() => setOpenForm(true)} style={{ marginBottom: 15 }} icon={<EditOutlined />}>
        Chỉnh sửa hồ sơ
      </Button>
      
      <UserProfile data={profileData} avatar={`${process.env.REACT_APP_S3URL}/${data?.currentUser.profile.avatar}`} />

      <Form
        openForm={openForm}
        setOpenForm={setOpenForm}
        initRow={data?.currentUser}
        refetch={refetch}
      />
    </div>
  )
}
