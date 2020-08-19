import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { DELETE_BRAND, GET_BRANDS } from './queries'
import { message } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import Image from 'components/commons/Image'

export default function Brand() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [openForm, setOpenForm] = useState(false)
  const [refreshLoading, setRefreshLoading] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_BRANDS,{variables: {idShop: currentShop?._id}})
  const [deleteRow] = useMutation(DELETE_BRAND)

  return (
    <div>
      <Grid
        data={data?.brands}
        colDef={[
          {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Giới thiệu',
            dataIndex: 'intro',
            key: 'intro'
          },
          {
            title: 'Logo',
            dataIndex: 'img',
            key: 'img',
            render: img => img ? <Image style={{width: 80}} src={img} fromAws/> : ''
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
            onClick: (rows, setRows) => {
              deleteRow({ variables: { idShop: currentShop?._id, ids: rows.map(r => r._id) } })
                .then(() => {
                  message.success('Xóa thành công')
                  setRows([])
                  setInitRow(undefined)
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
