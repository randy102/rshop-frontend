import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './form'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_STAFFS, DELETE_ROLE } from './queries'
import { message, Tag } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'

export default function General() {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_STAFFS,{variables: {idShop: currentShop?._id}})
  const [deletePermission] = useMutation(DELETE_ROLE)

  return (
    <div>
      <Grid
        data={data?.staffs}
        colDef={[
          {
            title: 'Họ tên',
            dataIndex: ['user','profile','fullName'],
            key: 'name'
          },
          {
            title: 'Email',
            dataIndex: ['user','credential','email'],
            key: 'email'
          },
          {
            title: 'Vai trò',
            dataIndex: 'name',
            key: 'role'
          },
          {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'des'
          },
          {
            title: 'Quyền',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions, row) => {
              if(row.isMaster) return <Tag color="red">Chủ cửa hàng</Tag>
              return permissions.map(p => <Tag>{p.name}</Tag>)
            }
          },
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
            onClick: (rows, setRows) => {
              deletePermission({ variables: { id: rows[0]._id, idShop: currentShop?._id } })
                .then(() => {
                  message.success('Xóa thành công')
                  setRows([])
                  setInitRow(undefined)
                  refetch()
                }).catch(e => message.error(e.message))
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
