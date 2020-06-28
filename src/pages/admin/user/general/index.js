import React, { useState } from 'react'
import Grid from 'components/admin/grid'
import Drawer from 'components/admin/drawer'
import RForm from 'components/admin/form'
import { Form, Tag, message } from 'antd'
import RInput from 'components/admin/form/rinput'
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS } from './queries'

var colDef = [
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

export default function General() {
  const [openForm, setOpenForm] = useState(false)
  const [form] = Form.useForm()
  let {data} = useQuery(GET_USERS)

  
  var headDef = [
    {
      icon: 'PlusOutlined',
      name: 'Tạo',
      onClick: (rows) => {
        setOpenForm(true)
      }
    },
    {
      icon: 'EditOutlined',
      name: 'Sửa',
      onClick: (rows) => {
        setOpenForm(true)
      },
    },
    {
      icon: 'DeleteOutlined',
      name: 'Xóa',
      onClick: (rows) => {
        setOpenForm(true)
      },
    },
    {
      icon: 'EyeOutlined',
      name: 'Chi tiết',
      onClick: (rows) => {
        setOpenForm(true)
      },
    }
  ]

  var footDef = [
    {
      name: 'Lưu',
      type: 'danger',
      onClick: () => {
        form.validateFields()
          .then(values => {
            
          })
          .catch(err => message.error(err.message))
      }
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
