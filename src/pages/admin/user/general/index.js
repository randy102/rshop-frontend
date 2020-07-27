import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import { Tag, message } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS, DELETE_USER } from './queries'
import Form from './form'


const colDef = [
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
  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_USERS)
  const [deleteUser] = useMutation(DELETE_USER)

  const headDef = [
    {
      type: 'create',
      onClick: () => {
        setOpenForm(true)
      }
    },
    {
      type: 'update',
      onClick: (rows) => {
        setInitRow(rows[0])
        setOpenForm(true)
      },
    },
    {
      type: 'delete',
      onClick: (rows) => {
        let input = { ids: rows.map(r => r._id) }
        deleteUser({ variables: { input } })
          .then(res => {
            message.success('Xóa thành công')
            refetch()
          }).catch(e => message.error(e.message))
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
