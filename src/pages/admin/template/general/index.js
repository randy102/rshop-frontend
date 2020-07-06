import React, { useState } from 'react'
import Grid from 'components/admin/grid'
import Form from './form'
import { useQuery } from '@apollo/react-hooks'
import { GET_TEMPLATES } from './queries'
import { message, Tag } from 'antd'
import * as moment from 'moment'
import { currencyFormatter } from 'utils/string'

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
  ]

  return (
    <div>
      <Grid
        data={data && data.plans}
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
