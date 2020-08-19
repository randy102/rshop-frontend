import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_PLANS, DELETE_PLAN, PUBLISH_PLAN, SUPPRESS_PLAN } from './queries'
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
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'des'
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'duration',
    key: 'dur'
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: value => currencyFormatter(value)
  },
  {
    title: 'Trạng thái',
    dataIndex: 'state',
    key: 'state',
    render: state => {
      switch(state){
        case 'DRAFT': return <Tag color='default'>Nháp</Tag>
        case 'PUBLISHED': return <Tag color='success'>Xuất bản</Tag>
        case 'SUPPRESSED': return <Tag color='error'>Thu hồi</Tag>
        default: return  <Tag color='warning'>Không xác định</Tag>
      }
    }
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: value => moment(value).format('DD/MM/YYYY')
  },
]

export default function General() {
  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_PLANS)
  const [deletePlan] = useMutation(DELETE_PLAN)
  const [publishPlan] = useMutation(PUBLISH_PLAN)
  const [suppressPlan] = useMutation(SUPPRESS_PLAN)

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
        if(rows[0].state !== 'DRAFT'){
          message.error('Chỉ có thể chỉnh sửa gói ở trạng thái nháp')
          return
        }
        setInitRow(rows[0])
        setOpenForm(true)
      },
    },
    {
      type: 'delete',
      selection: 'multiple',
      onClick: (rows,setRows) => {
        let ids =  rows.map(r => r._id)
        deletePlan({ variables: { ids } })
          .then(() => {
            message.success('Xóa thành công')
            setRows([])
            setInitRow(undefined)
            refetch()
          }).catch(e => message.error(e.message))
      }
    },
    {
      name: 'Xuất bản',
      icon: 'CloudUploadOutlined',
      selection: 'single',
      confirm: true,
      confirmMessage: 'Sau khi xuất bản sẽ không thể chỉnh sửa!',
      onClick: rows => {
        publishPlan({variables: {id: rows[0]._id}})
          .then(() =>{
            message.success('Xuất bản thành công')
            refetch()
          }).catch(e => message.error(e.message))
      }
    },
    {
      name: 'Thu hồi',
      icon: 'RollbackOutlined',
      selection: 'single',
      confirm: true,
      onClick: rows => {
        suppressPlan({variables: {id: rows[0]._id}})
          .then(() =>{
            message.success('Thu hồi thành công')
            refetch()
          }).catch(e => message.error(e.message))
      }
    }
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
