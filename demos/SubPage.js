import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {  } from './queries'
import { message } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import { Moment } from 'utils/moment'

const CONFIG = {
  DATA_PATH: '',
  DATA_GQL: undefined,
  DELETE_GQL: undefined 
}

export default function General() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(CONFIG.DATA_GQL,{variables: {idShop: currentShop?._id}})
  const [deleteRow] = useMutation(CONFIG.DELETE_GQL)

  return (
    <div>
      <Grid
        data={data?}
        colDef={[
          {
            title: '',
            dataIndex: '',
            key: ''
          },

          {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: val => Moment(val).format('DD-M-YYYY')
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
            onClick: (rows, setSelectedRows) => {
              const hideLoading = message.loading()
              deleteRow({ variables: { idShop: currentShop?._id, ids: rows.map(r => r._id) } })
                .then(() => {
                  message.success('Xóa thành công')
                  setInitRow(undefined)
                  setSelectedRows([])
                  hideLoading()
                  refetch()
                }).catch(e => message.error(e.message))
            }
          },
          {
            type: 'refresh',
            onClick: () => {
              const hideLoading = message.loading()
              refetch().then(hideLoading)
            }
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
