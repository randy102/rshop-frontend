import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TEMPLATES, DELETE_TEMPLATE } from './queries'
import { Tag, message } from 'antd'


const colDef = [
  {
    title: 'Tên',
    dataIndex:'name',
    key: 'name'
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    key: 'state',
    render: isActive => isActive ? <Tag color='success'>Xuất bản</Tag> : <Tag color='red'>Thu hồi</Tag>
  },
  {
    title: 'Ảnh',
    dataIndex: 'demoImg',
    key: 'demo',
    render: img => <img style={{width: 100}} src={`${process.env.REACT_APP_S3URL}/${img}`}/>
  }
]

export default function General() {
  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_TEMPLATES)
  const [deleteRow] = useMutation(DELETE_TEMPLATE)

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
      onClick: (rows, setRows) => {
        deleteRow({variables: {id: rows[0]._id}})
          .then(() => {
            message.success('Xóa thành công')
            setRows([])
            setInitRow(undefined)
            refetch()
          }).catch(e => message.error(e.message))
      },
      selection: 'single'
    }
  ]

  return (
    <div>
      <Grid
        data={data && data.templates}
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
