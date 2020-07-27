import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_PERMISSION, DELETE_PERMISSION } from './queries'
import { message } from 'antd'

const colDef = [
  {
    title: 'Tên',
    dataIndex:'name',
    key: 'name'
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'des'
  }
]

export default function General() {
  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_PERMISSION)
  const [deletePermission] = useMutation(DELETE_PERMISSION)

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
      selection: 'multiple',
      onClick: (rows) => {
        let input = { ids: rows.map(r => r._id) }
        deletePermission({ variables: { input } })
          .then(() => {
            message.success('Xóa thành công')
            refetch()
          }).catch(e => message.error(e.message))
      }
    }
  ]

return (
  <div>
    <Grid
      data={data && data.permissions}
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
