import React, { useState } from 'react'
import Grid from 'components/admin/grid'
import { Tag, message, Modal } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS, DELETE_USER } from './queries'
import Form from './form'
import { ExclamationCircleOutlined } from '@ant-design/icons'

var colDef = [
  {
    title: 'Email',
    dataIndex: ['credential', 'email'],
    key: 'email'
  },
  {
    title: 'Tên',
    dataIndex: ['profile', 'fullName'],
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
  var [openForm, setOpenForm] = useState(false)
  var [initRow, setInitRow] = useState()
  var { data, refetch } = useQuery(GET_USERS)
  var [deleteUser] = useMutation(DELETE_USER)

  var headDef = [
    {
      icon: 'PlusOutlined',
      name: 'Tạo',
      onClick: () => {
        setOpenForm(true)
      }
    },
    {
      icon: 'EditOutlined',
      name: 'Sửa',
      selection: 'single',
      onClick: (rows) => {
        setInitRow(rows[0])
        setOpenForm(true)
      },
    },
    {
      icon: 'DeleteOutlined',
      name: 'Xóa',
      selection: 'multiple',
      onClick: (rows) => {
        Modal.confirm({
          title: 'Bạn có chắc muốn xóa những người dùng này?',
          icon: <ExclamationCircleOutlined />,
          content: 'Hành động này sẽ không thể hoàn tác',
          onOk() {
            let input = { ids: rows.map(r => r._id) }
            deleteUser({ variables: { input } })
              .then(res => {
                message.success('Xóa thành công')
                refetch()
              }).catch(e => message.error(e.message))
          }
        })

      },
    }
  ]



  return (
    <div>
      <Grid
        data={data && data.users}
        colDef={colDef}
        headDef={headDef}
      />

      <Form
        openForm={openForm}
        setOpenForm={setOpenForm}
        initRow={initRow}
        setInitRow={setInitRow}
        refetch={refetch}
      />
    </div>
  )
}
