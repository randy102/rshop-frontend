import React, { useState } from 'react'
import Grid from 'components/admin/grid'
import Drawer from 'components/admin/drawer'
import RForm from 'components/admin/form'
import { Form, Tag } from 'antd'
import RInput from 'components/admin/form/rinput'
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS } from './queries'



export default function General() {
  const [openForm, setOpenForm] = useState(false)
  const [form] = Form.useForm()
  let {data} = useQuery(GET_USERS)
  

  const colDef = [
    {
      title: 'Email',
      dataIndex: ['credential','email'],
      key:'email'
    },
    {
      title: 'Tên',
      dataIndex: ['profile','fullName'],
      key: 'fullName'
    },
    {
      title: 'Vai trò',
      key: 'role',
      dataIndex: 'isAdmin',
      render: isAdmin => isAdmin ? <Tag color='red'>Admin</Tag> : <Tag color='blue'>User</Tag>
    },
  ]
  
  const headDef = [
    {
      icon: 'PlusOutlined',
      name: 'Thêm',
      onClick: (rows) => setOpenForm(true),
    },
    {
      icon: 'PlusOutlined',
      name: 'Thêmd',
      onClick: (rows) => {},
    }
  ]

  const footDef = [
    {
      name: 'Lưu',
      onClick: () => {
        form.validateFields()
          .then(values => console.log(values))
          .catch(err => console.log(err))
      },
      type: 'danger'
    },
    {
      name: 'Hủy',
      onClick: () => setOpenForm(false),
    }
  ]

  return (
    <div>

      <Grid
        data={data && data.users}
        colDef={colDef}
        headDef={headDef}
      />
      <Drawer
        footDef={footDef}
        title='Quản trị viên mới'
        onClose={() => setOpenForm(false)}
        visible={openForm}
      >
        <RForm form={form} >
          <RInput
            label='test'
            placeholder='Nhập...'
            name='test'
            rules={{
              type: 'email'
            }}
          />
        </RForm>
      </Drawer>
    </div>
  )
}
