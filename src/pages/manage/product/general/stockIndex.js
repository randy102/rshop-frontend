import React, { useState } from 'react'
import Grid from 'components/admin/Grid'
import Form from './stockForm'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { DELETE_STOCK, GET_PRODUCT_STOCKS } from './queries'
import { message } from 'antd'
import { useRecoilState } from 'recoil'
import { CURRENT_SHOP } from 'recoil/atoms/currentShop'
import Image from 'components/commons/Image'

export default function Stock({idProduct}) {
  const [currentShop] = useRecoilState(CURRENT_SHOP)

  const [openForm, setOpenForm] = useState(false)
  const [initRow, setInitRow] = useState()
  const { data, refetch } = useQuery(GET_PRODUCT_STOCKS,{variables: {idShop: currentShop?._id, idProduct}})
  const [deleteRow] = useMutation(DELETE_STOCK)

  return (
    <div>
      <Grid
        data={data?.stocksByProduct}
        colDef={[
          {
            title: '',
            dataIndex: 'imgs',
            key: 'img',
            render: imgs => imgs?.length && <Image style={{width: 80}} fromAws src={imgs[0]}/>
          },
          {
            title: 'Phân loại',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Giá',
            dataIndex: 'salePrice',
            key: 'price'
          },
          {
            title: 'Thông số',
            dataIndex: 'info',
            key: 'info',
            render: ({long,width,height,weight}) => `${long}m x ${width}m x ${height}m | ${weight} kg`
          },
        ]}

        headDef={[
          {
            type: 'create',
            onClick: () => {
              setOpenForm(true)
            },
            disabled: !idProduct
          },
          {
            type: 'update',
            onClick: (rows) => {
              setInitRow(rows[0])
              setOpenForm(true)
            }
          },
          {
            type: 'delete',
            selection: 'single',
            onClick: (rows, setSelectedRows) => {
              const hideLoading = message.loading()
              deleteRow({ variables: { idShop: currentShop?._id, ids: rows.map(r => r._id) } })
                .then(() => {
                  message.success('Xóa thành công')
                  setSelectedRows([])
                  setInitRow(undefined)
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
            },
            disabled: !idProduct
          }
        ]}
      />

      <Form
        openForm={openForm}
        setOpenForm={setOpenForm}
        initRow={initRow}
        setInitRow={setInitRow}
        refetch={refetch}
        idProduct={idProduct}
      />
    </div>
  )
}
