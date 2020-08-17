import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { DELETE_PRODUCT, GET_PRODUCTS } from './queries'
import { message, Tag } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { Moment } from 'utils/moment'

export default function General() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [openForm, setOpenForm] = useState(false)
  const [refreshLoading, setRefreshLoading] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_PRODUCTS,{variables: {idShop: currentShop?._id}})
  const [deleteRow] = useMutation(DELETE_PRODUCT)

  return (
    <div>
      <Grid
        data={data?.products}
        colDef={[
          {
            title: 'Tên mặt hàng',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Thể loại',
            dataIndex: ['category','name'],
            key: 'category'
          },
          {
            title: 'Thương hiệu',
            dataIndex: ['brand','name'],
            key: 'brand'
          },
          {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'des'
          },
          {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'active',
            render: isActive => isActive ? <Tag color='blue'>Hiển thị</Tag> : <Tag>Ẩn</Tag>
          },
          {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: value => Moment(value).format('D-MM-YYYY')
          }
        ]}

        headDef={[
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
            selection: 'single',
            onClick: (rows) => {
              deleteRow({ variables: { idShop: currentShop?._id, ids: rows.map(r => r._id) } })
                .then(() => {
                  message.success('Xóa thành công')
                  refetch()
                }).catch(e => message.error(e.message))
            }
          },
          {
            type: 'refresh',
            onClick: () => {
              setRefreshLoading(true)
              refetch().then(() => setRefreshLoading(false))
            },
            loading: refreshLoading
          }
        ]}
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