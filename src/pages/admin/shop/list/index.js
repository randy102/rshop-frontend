import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery } from '@apollo/react-hooks'
import { GET_SHOPS } from '../queries'
import { Tag } from 'antd'
import { Moment } from 'utils/moment'


export default function List() {
  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_SHOPS)
 
  return (
    <div>
      <Grid
        data={data && data.shops}
        colDef={[
          {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Tên miền',
            dataIndex: 'domain',
            key: 'domain'
          },
          {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'status',
            render: (isActive) => isActive ? <Tag color='success'>Đang hoạt động</Tag> : <Tag color='red'>Dừng hoạt động</Tag> 
          },
          {
            title: 'Chủ đề',
            dataIndex: ['template','name'],
            key: 'templateName'
          },
          {
            title: 'Tên chủ CH',
            dataIndex: ['master','profile','fullName'],
            key: 'masterName'
          },
          {
            title: 'Email chủ CH',
            dataIndex: ['master','credential','email'],
            key: 'masterEmail'
          },
          {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: value => Moment(value).format('DD/MM/YYYY')
          },
        ]}
        headDef={[
          {
            type: 'detail',
            onClick: (rows) => {
              setInitRow(rows[0])
              setOpenForm(true)
            }
          },
          {
            type: 'refresh',
            onClick: () => refetch()
          }
        ]}
      />

      <Form
        openForm={openForm}
        setOpenForm={setOpenForm}
        initRow={initRow}
        setInitRow={setInitRow}
      />
    </div>
  )
}
