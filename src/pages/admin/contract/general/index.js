import React, { useState } from 'react'
import Grid from 'components/admin/grid'
import Form from './form'
import { useQuery } from '@apollo/react-hooks'
import { GET_CONTRACTS } from './queries'
import { Moment } from 'utils/moment'
import { Tag } from 'antd'

const colDef = [
  {
    title: 'Tên người dùng',
    dataIndex:['user','profile','fullName'],
    key: 'fullName'
  },
  {
    title: 'Email',
    dataIndex: ['user','credential','email'],
    key: 'email'
  },
  {
    title: 'Tên gói',
    dataIndex: ['plan','name'],
    key: 'plan'
  },
  {
    title: 'Trạng thái',
    key: 'state',
    render: (v,row) =>{
      let isExpired = Moment().isSameOrAfter(Moment(row.expDate))
      return isExpired ? <Tag color='warning'>Hết hạn</Tag> : <Tag color='success'>Đang sử dụng</Tag>
    }
  },
  {
    title: 'Ngày ký hợp đồng',
    dataIndex: 'signDate',
    key: 'sign',
    render: val => Moment(val).format('DD/MM/YYYY')
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'expDate',
    key: 'exp',
    render: val => Moment(val).format('DD/MM/YYYY')
  }
]

export default function General() {
  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_CONTRACTS)
 

  const headDef = [
    {
      type: 'create',
      onClick: () => {
        setOpenForm(true)
      }
    }
  ]

return (
  <div>
    <Grid
      data={data && data.contracts}
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
