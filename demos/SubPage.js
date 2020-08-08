import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {  } from './queries'
import { message } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'

export default function General() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [openForm, setOpenForm] = useState(false)
  const [refreshLoading, setRefreshLoading] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(QUERY,{variables: {idShop: currentShop?._id}})
  const [deleteRow] = useMutation(/* ... */)

  return (
    <div>
      <Grid
        data={data?.staffs}
        colDef={[
          {
            title: '',
            dataIndex: '',
            key: ''
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
