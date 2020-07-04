import React, { useState } from 'react'
import Grid from 'components/admin/grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_PLANS, DELETE_PLAN, PUBLISH_PLAN, SUPPRESS_PLAN } from './queries'
import { message, Tag } from 'antd'
import * as moment from 'moment'

var colDef = [
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
    render: value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
  var [openForm, setOpenForm] = useState(false)
  var [initRow, setInitRow] = useState()
  var { data, refetch } = useQuery(GET_PLANS)
  var [deletePlan] = useMutation(DELETE_PLAN)
  var [publishPlan] = useMutation(PUBLISH_PLAN)
  var [suppressPlan] = useMutation(SUPPRESS_PLAN)

  var headDef = [
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
      onClick: rows => {
        let ids =  rows.map(r => r._id)
        deletePlan({ variables: { ids } })
          .then(() => {
            message.success('Xóa thành công')
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
